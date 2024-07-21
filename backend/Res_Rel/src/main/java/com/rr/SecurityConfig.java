package com.rr;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configures the HTTP security filter chain.
     *
     * @param  http the HttpSecurity object to configure
     * @return      the configured SecurityFilterChain
     * @throws Exception if there is an error configuring the security filter chain
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // Disable HTTP Basic authentication and CSRF protection
        return http
            .authorizeRequests(authorizeRequests ->
                // Allow all requests to be accessed
                authorizeRequests.anyRequest().permitAll()
            )
            .httpBasic().disable()
            .csrf().disable()
            .build();
    }
}

