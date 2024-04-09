package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.services.AuthService;


@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public String login(@RequestParam String mail, @RequestParam String motDePasse) {
        return authService.login(mail, motDePasse);
    }
    @PostMapping("/signup")
    public String signup(@RequestParam String mail, @RequestParam String motDePasse) {
        return authService.signup(mail, motDePasse);
    }
    
    }
