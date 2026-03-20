package com.lpu.todolist.security;

import com.lpu.todolist.entity.User;
import com.lpu.todolist.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Here username is email
        Optional<User> userOptional = userRepository.findByEmail(username);
        
        User user = userOptional.orElseThrow(() -> 
                new UsernameNotFoundException("User not found with email: " + username)
        );

        return new CustomUserDetails(user);
    }
}
