package com.lpu.todolist.controller;

import com.lpu.todolist.dto.AuthResponse;
import com.lpu.todolist.dto.LoginRequest;
import com.lpu.todolist.dto.SignupRequest;
import com.lpu.todolist.entity.User;
import com.lpu.todolist.repository.UserRepository;
import com.lpu.todolist.security.CustomUserDetails;
import com.lpu.todolist.security.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private com.lpu.todolist.repository.TokenBlacklistRepository tokenBlacklistRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody SignupRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, "Error: Email is already in use!"));
        }

        User user = User.builder()
                .name(signupRequest.getName())
                .email(signupRequest.getEmail())
                .password(passwordEncoder.encode(signupRequest.getPassword()))
                .build();

        userRepository.save(user);

        // Generate token for the new user so they don't have to log in immediately
        CustomUserDetails userDetails = new CustomUserDetails(user);
        String jwt = jwtUtil.generateToken(userDetails);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(jwt, "User registered successfully!"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getPassword()
                    )
            );

            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String jwt = jwtUtil.generateToken(userDetails);

            return ResponseEntity.ok(new AuthResponse(jwt, "Login successful"));
        } catch (BadCredentialsException e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body(new AuthResponse(null, "Error: Invalid email or password"));
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (StringUtils.hasText(authHeader) && authHeader.startsWith("Bearer ")) {
            String jwt = authHeader.substring(7);
            
            // Check if it's already blacklisted
            if (!tokenBlacklistRepository.existsByToken(jwt)) {
                tokenBlacklistRepository.save(new com.lpu.todolist.entity.TokenBlacklist(null, jwt));
            }
        }
        return ResponseEntity.ok(new AuthResponse(null, "Logout successful. Token invalidated."));
    }
}
