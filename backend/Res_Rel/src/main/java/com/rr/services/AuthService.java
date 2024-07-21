package com.rr.services;

import java.util.Date;
import java.util.HashMap;

import org.hibernate.mapping.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import com.rr.utils.JwtUtil;

@Service
public class AuthService {

    @Autowired
    private CitoyenRepository utilisateurRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public AuthService(CitoyenRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * Authenticates a user by checking their email and password against the database.
     *
     * @param mail The email address of the user.
     * @param motdePasse The password of the user.
     * @return A success message if authentication is successful, or an error message.
     * @throws BadCredentialsException If the email or password is incorrect.
     */
    @Transactional(readOnly = false) // Specifies that the query is only for reading information
    public java.util.Map<String, String> login(String mail, String motdePasse) {
        // Find the user by their email
        var resu = utilisateurRepository.findByMail(mail);

        // If the user does not exist, throw an exception
        if (resu.isEmpty()) {
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }

        // Retrieve the user object from the result
        Citoyen citoyen = resu.get();

        // Check if the password matches the stored hashed password
        if (!passwordEncoder.matches(motdePasse, citoyen.getMdp())) {
            throw new BadCredentialsException("Email ou mot de passe incorrect");
        }
        if (citoyen.getValidaton() == false) {
            throw new BadCredentialsException("Votre compte n'a pas encore été validé");
        }
        if (citoyen.getActif() == false) {
            throw new BadCredentialsException("Votre compte a été désactivé");
        }
        citoyen.setDateDerniereConnexion(new Date());
        utilisateurRepository.save(citoyen);
        java.util.Map<String, String> userInfos = new HashMap<>();
        userInfos.put("token", JwtUtil.generateToken(mail));
        userInfos.put("prenom", citoyen.getPrenom());
        userInfos.put("nom", citoyen.getNom());
        userInfos.put("mail", citoyen.getMail());
        userInfos.put("role", citoyen.getRole());
        return userInfos;
    }


    @Transactional(rollbackFor = Exception.class) // pour dire que si jamais ça marche mal,
    public String signup(String mail, String motdePasse, String nom, String prenom, String numTel,
                            String numSec, Date dateNaissance, char sexe, String codePostal, String ville) {
        var resu = utilisateurRepository.findByMail(mail);
        if (resu.isPresent()) {
            throw new BadCredentialsException("Cet identifiant est déjà utilisé");
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
        nouveauCitoyen.setRole("citoyen");
        utilisateurRepository.save(nouveauCitoyen);

        return "Inscription réussi";
    }
}