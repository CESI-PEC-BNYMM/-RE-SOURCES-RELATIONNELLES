package com.example.exemple.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.example.exemple.utilisateur;
import com.example.exemple.Repository.UtilisateurRepository;


@Controller
public class ContactController {

    @Autowired
    private UtilisateurRepository UtilisateurRepository;

    @GetMapping("/api/contact")
    public String contact(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String email = authentication.getName();
        utilisateur utilisateur = UtilisateurRepository.findByEmail(email);
        model.addAttribute("nom", utilisateur);
        return "contact";
    }

}

