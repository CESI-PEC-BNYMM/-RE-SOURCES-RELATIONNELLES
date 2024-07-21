package com.rr.services;

import java.util.Date;
import java.util.HashMap;

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
    public BCryptPasswordEncoder passwordEncoder;

    public AuthService(CitoyenRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    /**
     * Authenticates a user by checking their email and password against the
     * database.
     *
     * @param mail       The email address of the user.
     * @param motdePasse The password of the user.
     * @return A success message if authentication is successful, or an error
     *         message.
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

    /**
     * Sign up a new user.
     *
     * @param mail The email address of the user.
     * @param motdePasse The password of the user.
     * @param nom The last name of the user.
     * @param prenom The first name of the user.
     * @param numTel The phone number of the user.
     * @param numSec The social security number of the user.
     * @param dateNaissance The date of birth of the user.
     * @param sexe The gender of the user.
     * @param codePostal The postal code of the user.
     * @param ville The city of the user.
     * @return A success message if the sign-up is successful, or an error message.
     * @throws BadCredentialsException If the email is already used.
     */
    @Transactional(rollbackFor = Exception.class) // Specifies that if anything goes wrong, the entire transaction will be rolled back
    public String signup(String mail, String motdePasse, String nom, String prenom, String numTel,
                            String numSec, Date dateNaissance, char sexe, String codePostal, String ville) {
        // Find the user by their email
        var resu = utilisateurRepository.findByMail(mail);

        // If the user already exists, throw an exception
        if (resu.isPresent()) {
            throw new BadCredentialsException("Cet identifiant est déjà utilisé");
        }

        // Create a new user object
        Citoyen nouveauCitoyen = new Citoyen();

        // Set the user's attributes
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
        nouveauCitoyen.setRole("citoyen"); // Set the user's role to "citoyen"

        // Save the user to the database
        utilisateurRepository.save(nouveauCitoyen);

        // Return a success message
        return "Inscription réussi";
    }
}