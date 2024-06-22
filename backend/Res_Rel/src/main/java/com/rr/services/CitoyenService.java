package com.rr.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;

public class CitoyenService {

    @Autowired
    private CitoyenRepository citoyenRepository;

  /*  public Citoyen findbyUsername(String username) {
        return citoyenRepository.findById(username);
    }*/

    public Citoyen save(Citoyen citoyen) {
        return citoyenRepository.save(citoyen);
    }
}