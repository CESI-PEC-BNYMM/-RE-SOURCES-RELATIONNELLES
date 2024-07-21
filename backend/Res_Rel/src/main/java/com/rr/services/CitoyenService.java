package com.rr.services;

import java.util.Date;
import java.util.List;

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

    /**
     * Saves a Citoyen entity to the database.
     *
     * @param citoyen The Citoyen entity to save.
     * @return The saved Citoyen entity.
     */
    public Citoyen save(Citoyen citoyen) {
        // Save the Citoyen entity to the database
        return citoyenRepository.save(citoyen);
    }

    /**
     * Retrieves a Citoyen entity from the database based on the provided email
     * address.
     * 
     * @param emailcitoyen The email address of the Citoyen to retrieve.
     * @return The retrieved Citoyen entity if found, otherwise null.
     */
    public Citoyen findbyMail(String emailcitoyen) {

        return citoyenRepository.findByMail(emailcitoyen).orElse(null);
    }

    /**
     * Retrieves a Citoyen entity from the database based on the provided email
     * address.
     *
     * @param email The email address of the Citoyen to retrieve.
     * @return The retrieved Citoyen entity if found, otherwise throws a
     *         {@code RuntimeException}.
     * @throws RuntimeException if no Citoyen entity is found with the provided
     *                          email.
     */
    public Citoyen findByEmail(String email) {
        return citoyenRepository.findByMail(email)
                .orElseThrow(() -> new RuntimeException("Citoyen with email " + email + " not found"));
    }

    /**
     * Retrieves all Citoyen entities from the database.
     *
     * @return A list of all Citoyen entities.
     */
    public List<Citoyen> findAll() {
        // Retrieve all Citoyen entities from the database
        return citoyenRepository.findAll();
    }

    /**
     * Removes a Citoyen entity from the database based on the provided email
     * address.
     *
     * @param mailcitoyen The email address of the Citoyen to remove.
     */
    @Transactional
    public void removeCitoyen(String mailcitoyen) {
        // Delete the Citoyen entity from the database based on the provided email
        // address
        citoyenRepository.deleteByMail(mailcitoyen);
    }

    /**
     * Validates a Citoyen entity in the database, setting the "validaton" flag to
     * true.
     *
     * @param citoyen The Citoyen entity to validate.
     */
    public void validateCitoyen(Citoyen citoyen) {
        // Check if the Citoyen entity is not already validated
        if (!citoyen.getValidaton()) {
            // Set the "validaton" flag to true
            citoyen.setValidaton(true);
            // Save the updated Citoyen entity in the database
            citoyenRepository.save(citoyen);
        }
    }

    /**
     * Updates a Citoyen entity in the database.
     *
     * @param oldMail       The current email address of the Citoyen to update.
     * @param newMail       The new email address of the Citoyen.
     * @param name          The new name of the Citoyen.
     * @param prenom        The new first name of the Citoyen.
     * @param numTel        The new phone number of the Citoyen.
     * @param numSec        The new social security number of the Citoyen.
     * @param role          The new role of the Citoyen.
     * @param dateNaissance The new date of birth of the Citoyen.
     * @param sexe          The new gender of the Citoyen.
     * @param validaton     The new validation status of the Citoyen.
     * @param actif         The new active status of the Citoyen.
     * @param codePostal    The new postal code of the Citoyen.
     * @param ville         The new city of the Citoyen.
     * @param mdp           The new password of the Citoyen.
     * @throws EntityNotFoundException If the Citoyen with the provided email
     *                                 address is not found.
     */
    @Transactional
    public void updateCitoyen(String oldMail, String newMail, String name, String prenom, String numTel, String numSec,
            String role, Date dateNaissance, char sexe, boolean validaton, boolean actif, String codePostal,
            String ville, String mdp) {
        // Find the Citoyen entity with the provided email address
        Citoyen optionalCitoyen = citoyenRepository.findById(oldMail).orElse(null);
        if (optionalCitoyen != null) {
            // Delete the old Citoyen entity
            Citoyen oldCitoyen = optionalCitoyen;
            citoyenRepository.delete(oldCitoyen);

            // Create a new Citoyen entity with the updated attributes
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
                // Encode the new password if it is provided
                newCitoyen.setMdp(passwordEncoder.encode(mdp));
            }

            // Save the new Citoyen entity in the database
            citoyenRepository.save(newCitoyen);
        } else {
            // Throw an exception if the Citoyen with the provided email address is not
            // found
            throw new EntityNotFoundException("Citizen not found with email: " + oldMail);
        }
    }

    /**
     * Retrieves a list of tickets associated with a citoyen based on the provided
     * email address.
     *
     * @param mail The email address of the citoyen.
     * @return A list of tickets associated with the citoyen, or null if the citoyen
     *         is not found.
     */
    public List<Ticket> getTicketsByCitoyenMail(String mail) {
        // Find the citoyen entity with the provided email address
        Citoyen citoyen = citoyenRepository.findById(mail).orElse(null);

        // Return the list of tickets associated with the citoyen, or null if the
        // citoyen is not found
        return citoyen != null ? citoyen.getTickets() : null;
    }
}
