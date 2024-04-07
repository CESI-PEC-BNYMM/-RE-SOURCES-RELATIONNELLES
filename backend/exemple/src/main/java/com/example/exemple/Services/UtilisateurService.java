package com.example.exemple.Services;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.exemple.utilisateur;
import com.example.exemple.Repository.UtilisateurRepository;

public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    public utilisateur findbyUsername(String username) {
        return utilisateurRepository.findByIdentifiant(username);
    }

    public utilisateur save(utilisateur utilisateur) {
        return utilisateurRepository.save(utilisateur);
    }
}