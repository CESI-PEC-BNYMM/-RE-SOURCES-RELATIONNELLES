package com.rr.services;

import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;

@Service
public class AuthService {

    @Autowired
    private CitoyenRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional(readOnly = true) // pour spécifier que la requete ne sert qu'à lire les informations
    public String login(String mail, String motdePasse) {
        Optional<Citoyen> citoyen = utilisateurRepository.findByMail(mail);
        if (citoyen.isPresent() && passwordEncoder.matches(motdePasse, citoyen.get().getMdp())) {
            return "Connexion reussie";
        } else {
            return "Identifiant ou mot de passe incorrect";
        }
    }


    @Transactional(rollbackFor = Exception.class) // pour dire que si jamais ça marche mal,
    public String signup(String mail, String motdePasse, String nom, String prenom, String numTel,
                            String numSec, Date dateNaissance, char sexe, String codePostal, String ville) {
        var resu = utilisateurRepository.findByMail(mail);
        if (resu.isPresent()) {
            return "Echec lors de l'inscription. Cet identifiant est déjà utilisé";
        }
        Citoyen nouveauCitoyen = new Citoyen();
        nouveauCitoyen.setMail(mail);
        nouveauCitoyen.setMdp(passwordEncoder.encode(motdePasse));
        nouveauCitoyen.setPrenom(prenom);
        nouveauCitoyen.setNom(nom);
        nouveauCitoyen.setNumTel(numTel);
        nouveauCitoyen.setNumSec(numSec);
        nouveauCitoyen.setDateNaissance(dateNaissance);
        nouveauCitoyen.setSexe(sexe);
        nouveauCitoyen.setCodePostal(codePostal);
        nouveauCitoyen.setVille(ville);
        utilisateurRepository.save(nouveauCitoyen);

        return "Inscription réussi";
    }
}