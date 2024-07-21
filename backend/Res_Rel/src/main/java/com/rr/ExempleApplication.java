package com.rr;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication(exclude = {
		org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration.class,
}
)

public class ExempleApplication {

	@Bean
	public BCryptPasswordEncoder passwordEncoder (){

		return new BCryptPasswordEncoder();
	}

	/**
	 * Main method to start the Spring Boot application.
	 *
	 * @param args the command line arguments
	 */
	public static void main(String[] args) {
		// Run the Spring Boot application
		SpringApplication.run(ExempleApplication.class, args);
	}
}