package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;

import java.util.Optional;


@Controller
public class ContactController {

    @Autowired
    private CitoyenRepository CitoyenRepository;

    @GetMapping("/contact")
    public String contact(Model model) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String mail = authentication.getName();
        Optional<Citoyen> citoyen = CitoyenRepository.findByMail(mail);
        model.addAttribute("nom", citoyen);
        return "contact";
    }

}
