package org.fpt.blooddonate.configs;

import org.fpt.blooddonate.middlewares.JwtAuthenticationFilter;
import org.fpt.blooddonate.utils.AuthUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {
    private final AuthUtil authUtil;

    public SecurityConfig(AuthUtil authUtil) {
        this.authUtil = authUtil;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(auth -> auth
                   .anyRequest().permitAll()
//                .requestMatchers( "/api/auth/login", "/api/auth/register").permitAll()
//                .anyRequest().authenticated()
            ).addFilterBefore(new JwtAuthenticationFilter(authUtil), UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
