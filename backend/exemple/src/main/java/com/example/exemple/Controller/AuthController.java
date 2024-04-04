package com.example.exemple.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.exemple.Services.AuthService;


@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestParam String identifiant, @RequestParam String motDePasse) {
        return authService.login(identifiant, motDePasse);
    }
    @PostMapping("/register")
    public String signup(@RequestParam String identifiant, @RequestParam String motDePasse) {
        return authService.signup(identifiant, motDePasse);
    }
    
    }
