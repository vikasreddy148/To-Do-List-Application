package com.lpu.todolist.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults()) // Enables CORS based on WebConfig
            .csrf(csrf -> csrf.disable()) // Disable CSRF for simple REST API
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/tasks/**").permitAll() // Allow unauthenticated access to tasks
                .anyRequest().authenticated()
            );
        return http.build();
    }
}
