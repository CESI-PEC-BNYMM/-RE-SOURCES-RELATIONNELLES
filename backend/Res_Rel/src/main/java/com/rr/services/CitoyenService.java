package com.rr.services;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.entity.Ticket;
import com.rr.repository.CitoyenRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class CitoyenService {

    @Autowired
    private final CitoyenRepository citoyenRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;


    public CitoyenService(CitoyenRepository citoyenRepository) {
        this.citoyenRepository = citoyenRepository;
    }

    public Citoyen save(Citoyen citoyen) {

        return citoyenRepository.save(citoyen);
    }

    public Citoyen findbyMail(String emailcitoyen){

        return findbyMail(emailcitoyen);
    }

    public Citoyen findByEmail(String email) {
        return citoyenRepository.findByMail(email)
            .orElseThrow(() -> new RuntimeException("Citoyen with email " + email + " not found"));
    }

    public List<Citoyen> findAll() {
        return citoyenRepository.findAll();
    }

    @Transactional
    public void removeCitoyen(String mailcitoyen) {
        citoyenRepository.deleteByMail(mailcitoyen);
    }

    public void validateCitoyen(Citoyen citoyen) {
        if (citoyen.getValidaton() != true) {
            citoyen.setValidaton(true);
            citoyenRepository.save(citoyen);
        }
    }

    @Transactional
    public void updateCitoyen(String oldMail, String newMail, String name, String prenom, String numTel, String numSec, String role, Date dateNaissance, char sexe, boolean validaton, boolean actif, String codePostal, String ville, String mdp) {
        // Optional<Citoyen> optionalCitoyen = citoyenRepository.findByMail(oldMail);
        Citoyen optionalCitoyen = citoyenRepository.findById(oldMail).orElse(null);
        if (optionalCitoyen != null) {
            Citoyen oldCitoyen = optionalCitoyen;
            citoyenRepository.delete(oldCitoyen);

            Citoyen newCitoyen = new Citoyen();
            newCitoyen.setMail(newMail);
            newCitoyen.setNom(name);
            newCitoyen.setPrenom(prenom);
            newCitoyen.setNumTel(numTel);
            newCitoyen.setNumSec(numSec);
            newCitoyen.setRole(role);
            newCitoyen.setDateNaissance(dateNaissance);
            newCitoyen.setSexe(sexe);
            newCitoyen.setValidaton(validaton);
            newCitoyen.setActif(actif);
            newCitoyen.setCodePostal(codePostal);
            newCitoyen.setVille(ville);
            if (mdp != null && !mdp.isEmpty()) {
                newCitoyen.setMdp(passwordEncoder.encode(mdp));
            }

            citoyenRepository.save(newCitoyen);
        } else {
            throw new EntityNotFoundException("Citizen not found with email: " + oldMail);
        }
    }

    public List<Ticket> getTicketsByCitoyenMail(String mail) {
        Citoyen citoyen = citoyenRepository.findById(mail).orElse(null);
        return citoyen != null ? citoyen.getTickets() : null;
    }
}
