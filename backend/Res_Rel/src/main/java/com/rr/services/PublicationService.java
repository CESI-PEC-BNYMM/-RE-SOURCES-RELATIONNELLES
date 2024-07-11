package com.rr.services;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;



@Service
public class PublicationService {

boolean vrai = true;
    @Autowired
    private PublicationRepository publicationRepository;

    public PublicationService(PublicationRepository publicationRepository){
        this.publicationRepository = publicationRepository;
    }

    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }
// à repenser
   /* @Autowired List<Publication> getAllPubCitoyen(String emailCitoyen){
        Publication publication =  publicationRepository.findByEmail(emailCitoyen).orElseThrow();
        return publication.findAll();
    }*/

    @Autowired
    public void deletePublication(Integer idPublication) {
        publicationRepository.deleteById(idPublication);
    }

    public void reportPublication(Integer idPublication) {
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();
        publicationRepository.report(idPublication);
        publication.isPubSignalee();
    }

    @Autowired
    public void validatePublicaiton(Integer idPublication){
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();

        publication.setPubSignalee(vrai);
    }

    @Autowired
    public void findId(Integer idPublication){
         this.publicationRepository.findById(idPublication);
    }

    public void publishPublication(Integer idPublication){
        Publication publicaiton = publicationRepository.findById(idPublication).orElseThrow();
        if (publicaiton.isPubValidee()) {
            Date aujourdhui = new Date();
            publicaiton.setDatePub(aujourdhui);
        }
    }

}