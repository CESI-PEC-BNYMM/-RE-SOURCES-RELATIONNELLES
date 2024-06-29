package com.rr.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.entity.DemandeAmi;
import com.rr.repository.CitoyenRepository;
import com.rr.repository.DemandeAmiRepository;

@Service

/**
 * This class provides service methods for working with AmiRequest entities.
 */
public class DemandeAmiService {
    
    @Autowired
    private DemandeAmiRepository demandeAmiRepository; // Repository for AmiRequest entities

    @Autowired
    private CitoyenRepository UtilisateurRepository; // Repository for User entities

    /**
     * Retrieves all AmiRequest entities from the database.
     * @return A list of AmiRequest entities.
     */
    public List<DemandeAmi> findall() {
        return demandeAmiRepository.findAll();
    }

    /**
     * Adds a new AmiRequest entity to the database.
     * @param citoyen The user who is sending the friend request.
     * @param ami The user who is receiving the friend request.
     * @return The newly created AmiRequest entity.
     */
    public DemandeAmi ajouterAmi(Citoyen citoyen, Citoyen ami) {
        DemandeAmi demande = new DemandeAmi();
        demande.setCitoyen(citoyen);
        demande.setCitoyenreceveur(ami);
        demande.setDemandeValidee(false); // Initially not confirmed
        return demandeAmiRepository.save(demande);
    }

    /**
     * Confirms an AmiRequest entity by setting its "confirmed" field to true.
     * @param demandeId The ID of the AmiRequest entity to confirm.
     * @return The confirmed AmiRequest entity.
     */
    public DemandeAmi confirmerDemande(Integer demandeId) {
        DemandeAmi demande = demandeAmiRepository.findById(demandeId).orElseThrow();
        demande.setDemandeValidee(true);
        return demandeAmiRepository.save(demande);
    }

    /**
     * Deletes an AmiRequest entity from the database.
     * @param demandeId The ID of the AmiRequest entity to delete.
     * @return The deleted AmiRequest entity.
     */
    public DemandeAmi refuserDemande(Integer demandeId) {
        DemandeAmi demande = demandeAmiRepository.findById(demandeId).orElseThrow();
        demandeAmiRepository.delete(demande);
        return demande;
    }

    /**
     * Deletes an AmiRequest entity from the database by its ID.
     * @param demandeId The ID of the AmiRequest entity to delete.
     */
    public void supprimerAmi(Integer demandeId) {
        demandeAmiRepository.deleteById(demandeId);
    }

}
