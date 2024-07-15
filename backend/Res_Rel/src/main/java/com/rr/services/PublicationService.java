package com.rr.services;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import com.rr.entity.Citoyen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;
import com.rr.repository.CitoyenRepository;
import com.rr.entity.Citoyen;




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
    @Autowired

    public List<Publication> findByCitoyen(Citoyen citoyen){
        return publicationRepository.findByCitoyen(citoyen);
    }

    @Autowired
    public void deletePublication(int idPublication) {
        publicationRepository.deleteById(idPublication);
    }

    public boolean reportPublication(Integer idPublication) {
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();
        return publication.isPubSignalee();
    }

    @Autowired
    public void validatePublicaiton(Integer idPublication){
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();

        publication.setPubSignalee(vrai);
    }

    @Autowired
    public Optional<Publication> findById(int idPublication){
        return publicationRepository.findById(idPublication);
    }

    public void publishPublication(Integer idPublication){
        Publication publicaiton = publicationRepository.findById(idPublication).orElseThrow();
        if (publicaiton.isPubValidee()) {
            Date aujourdhui = new Date();
            publicaiton.setDatePub(aujourdhui);
        }
    }


  /*  public  Optional<Publication> findByDatePub (Date DatePub){
        return publicationRepository.findByDatePub(DatePub);
    }*/


}