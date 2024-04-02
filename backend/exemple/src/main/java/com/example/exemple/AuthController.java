package com.example.exemple;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestParam String identifiant, @RequestParam String motDePasse) {
        return authService.login(identifiant, motDePasse);
    }
    @PostMapping("/signup")
    public String signup(@RequestParam String identifiant, @RequestParam String motDePasse) {
        return authService.signup(identifiant, motDePasse);
    }
    
    }
