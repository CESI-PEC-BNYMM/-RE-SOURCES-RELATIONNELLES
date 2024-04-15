package com.rr.services;

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
    public String signup(String mail, String motdePasse) {
        var resu = utilisateurRepository.findByMail(mail);
        if (resu.isPresent()) {
            return "Echec lors de l'inscription. Cet identifiant est déjà utilisé";
        }
        Citoyen nouveauCitoyen = new Citoyen();
        nouveauCitoyen.setMail(mail);
        nouveauCitoyen.setMdp(passwordEncoder.encode(motdePasse));
        utilisateurRepository.save(nouveauCitoyen);

        return "Inscription réussi";
    }
}
