package com.rr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.repository.UtilisateurRepository;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String login(String identifiant, String motdePasse) {
    Citoyen citoyen = utilisateurRepository.findByIdentifiant(identifiant);
    if (citoyen != null && passwordEncoder.matches(motdePasse, citoyen.getMdp())) {
        return "Connexion reussie";
    } else {
        return "Identifiant ou mot de passe incorrect";
    }
}

public String signup(Long identifiant, String motdePasse) {
    var resu = utilisateurRepository.findById(identifiant);
    if (resu.isPresent()) {
        return "Echec lors de l'inscription. Cet identifiant est déjà utilisé";
    }
    Citoyen nouveauCitoyen = new Citoyen();
    nouveauCitoyen.setIdCitoyen(identifiant);
    nouveauCitoyen.setMdp(passwordEncoder.encode(motdePasse));
    utilisateurRepository.save(nouveauCitoyen);

    return "Inscription réussi";
}
}
