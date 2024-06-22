package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.repository.DemandeAmiRepository;
@RestController
@RequestMapping("/api")

public class DemandeAmiController {

    @Autowired
    private DemandeAmiController (DemandeAmiRepository demandeAmiRepository) {
        this.demandeAmiRepository = demandeAmiRepository;
    }

    private DemandeAmiRepository demandeAmiRepository;


    
}
