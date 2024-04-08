package com.rr.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.DemandeAmi;
import com.rr.repository.DemandeAmiRepository;
import com.rr.repository.UtilisateurRepository;

@Service

public class MaListeAmi {
    @Autowired
    private DemandeAmiRepository demandeAmiRepository;

    @Autowired
    private UtilisateurRepository UtilisateurRepository;

  /*  public DemandeAmi ajouterAmi(String citoyenMail, String amiMail) {
        DemandeAmi demande = new DemandeAmi();
        demande.setCitoyen(UtilisateurRepository.findByEmail(citoyenMail));
        demande.setAmi(UtilisateurRepository.findByEmail(amiMail));
        demande.setDemandeValidee(false); // Initially not confirmed
        return demandeAmiRepository.save(demande);
    }*/

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

}
