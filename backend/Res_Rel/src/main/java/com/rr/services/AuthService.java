package com.rr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.repository.UtilisateurRepository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Transactional(readOnly = true) // pour spécifier que la requete ne sert qu'à lire les informations
    public String login(String email, String motdePasse) {
        Optional<Citoyen> citoyen = utilisateurRepository.findByEmail(email);
        if (citoyen.isPresent() && passwordEncoder.matches(motdePasse, citoyen.get().getMdp())) {
            return "Connexion reussie";
        } else {
            return "Identifiant ou mot de passe incorrect";
        }
    }

    @Transactional(rollbackFor = Exception.class) // pour dire que si jamais ça marche mal,
    public String signup(String email, String motdePasse) {
        var resu = utilisateurRepository.findByEmail(email);
        if (resu.isPresent()) {
            return "Echec lors de l'inscription. Cet identifiant est déjà utilisé";
        }
        Citoyen nouveauCitoyen = new Citoyen();
        nouveauCitoyen.setMail(email);
        nouveauCitoyen.setMdp(passwordEncoder.encode(motdePasse));
        utilisateurRepository.save(nouveauCitoyen);

        return "Inscription réussi";
    }
}
