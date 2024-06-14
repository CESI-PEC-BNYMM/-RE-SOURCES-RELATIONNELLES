package com.rr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;

@RestController
@RequestMapping
//Le contrôleur avec une méthode pour gérer les requêtes GET et retourner la liste des entités Citoyen (utilisateur)
public class pour_bdd {

    @Autowired
    private CitoyenRepository citoyenRepository;

    @GetMapping
    public List<Citoyen> getAllCitoyens() {
        return citoyenRepository.findAll();
    }
}
