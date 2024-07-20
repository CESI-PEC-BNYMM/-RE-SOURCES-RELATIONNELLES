package com.rr.services;

import java.util.Date;
import java.util.List;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.entity.Ticket;
import com.rr.repository.CitoyenRepository;

@Service
public class CitoyenService {

    @Autowired
    private final CitoyenRepository citoyenRepository;

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

    public void removeCitoyen(String mailcitoyen) {
        citoyenRepository.deleteByMail(mailcitoyen)
            .orElseThrow(() -> new RuntimeException("Le citoyen que vous essayez de supprimer n'existe pas"));
    }

    public void validateCitoyen(Citoyen citoyen) {
        if (citoyen.getValidaton() != 1) {
            citoyen.setValidaton(1);
            citoyenRepository.save(citoyen);
        }
    }

    public void update(Citoyen citoyen, String name, String prenom, String mail, String numTel, String numSec, String role, Date dateNaissance, char sexe, int validaton, String codePostal, String ville, String mdp) {
        citoyen.setNom(name);
        citoyen.setPrenom(prenom);
        citoyen.setMail(mail);
        if (numTel != null && !numTel.isEmpty()) {
            citoyen.setNumTel(numTel);
        }
        citoyen.setNumSec(numSec);
        citoyen.setRole(role);
        citoyen.setDateNaissance(dateNaissance);
        citoyen.setSexe(sexe);
        citoyen.setValidaton(validaton);
        citoyen.setCodePostal(codePostal);
        citoyen.setVille(ville);
        if (!Objects.equals(mdp, "")) {
            citoyen.setMdp(mdp);
        }
        citoyenRepository.save(citoyen);
    }

    public List<Ticket> getTicketsByCitoyenMail(String mail) {
        Citoyen citoyen = citoyenRepository.findById(mail).orElse(null);
        return citoyen != null ? citoyen.getTickets() : null;
    }
}
