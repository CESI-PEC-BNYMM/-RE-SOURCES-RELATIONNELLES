package com.rr.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.rr.entity.Citoyen;
import com.rr.repository.UtilisateurRepository;

public class UtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

  /*  public Citoyen findbyUsername(String username) {
        return utilisateurRepository.findById(username);
    }*/

    public Citoyen save(Citoyen citoyen) {
        return utilisateurRepository.save(citoyen);
    }
}