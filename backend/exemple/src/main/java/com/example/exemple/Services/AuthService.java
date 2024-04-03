package com.example.exemple.Services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.exemple.utilisateur;
import com.example.exemple.Repository.UtilisateurRepository;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String login(String identifiant, String motdePasse) {
    utilisateur utilisateur = utilisateurRepository.findByIdentifiant(identifiant);
    if (utilisateur != null && passwordEncoder.matches(motdePasse, utilisateur.getMotdepasse())) { 
        return "Connexion reussie";
    } else {
        return "Identifiant ou mot de passe incorrect";
    }
}

public String signup(String identifiant, String motdePasse) {
    if (utilisateurRepository.findByIdentifiant(identifiant) != null) {
        return "Echec lors de l'inscription. Cet identifiant est déjà utilisé";
    }
    utilisateur nouveauUtilisateur = new utilisateur();
    nouveauUtilisateur.setIdentifiant(identifiant);
    nouveauUtilisateur.setMotdepasse(passwordEncoder.encode(motdePasse));
    utilisateurRepository.save(nouveauUtilisateur);

    return "Inscription réussi";
}
}
