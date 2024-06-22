package com.rr.services;

import com.rr.entity.Citoyen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.DemandeAmi;
import com.rr.repository.CitoyenRepository;
import com.rr.repository.DemandeAmiRepository;

import javax.swing.*;

@Service

public class MaListeAmi {
    @Autowired
    private DemandeAmiRepository demandeAmiRepository;

    @Autowired
    private CitoyenRepository CitoyenRepository;

    public DemandeAmi ajouterAmi(Citoyen citoyen, Citoyen ami) {
        DemandeAmi demande = new DemandeAmi();
        demande.setCitoyen(citoyen);
        demande.setCitoyenreceveur(ami);
       /* demande.(CitoyenRepository.findByMail(citoyenMail));
        demande.(CitoyenRepository.findByMail(amiMail)); */
        demande.setDemandeValidee(false); // Initially not confirmed
        return demandeAmiRepository.save(demande);
    }

    public void supprimerAmi(Integer demandeId) {
        demandeAmiRepository.deleteById(demandeId);
    }

    public DemandeAmi confirmerDemande(Integer demandeId) {
        DemandeAmi demande = demandeAmiRepository.findById(demandeId).orElseThrow();
        demande.setDemandeValidee(true);
        return demandeAmiRepository.save(demande);
    }

    public DemandeAmi refuserDemande(Integer demandeId) {
        DemandeAmi demande = demandeAmiRepository.findById(demandeId).orElseThrow();
        demandeAmiRepository.delete(demande);
        return demande;
    }

   /* public ListedAmi(Citoyen citoyen){

        =
    }*/

}
