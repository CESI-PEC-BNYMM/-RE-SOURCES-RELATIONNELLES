package com.rr.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;

@Service
public class PublicationService {

    private final boolean vrai = true;
    private final PublicationRepository publicationRepository;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    public List<Publication> getAllPublications() {
        return publicationRepository.findAll();
    }

    public List<Publication> findByCitoyen(Citoyen citoyen) {
        return publicationRepository.findByCitoyen(citoyen);
    }

    public void deletePublication(int idPublication) {
        publicationRepository.deleteById(idPublication);
    }

    public boolean reportPublication(Integer idPublication) {
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();
        return publication.isPubSignalee();
    }

    public void validatePublication(Integer idPublication) {
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();
        publication.setPubSignalee(vrai);
        publicationRepository.save(publication);  // Save the updated publication
    }

    public Optional<Publication> findById(int idPublication) {
        return publicationRepository.findById(idPublication);
    }

    public void publishPublication(Integer idPublication) {
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();
        if (publication.isPubValidee()) {
            Date aujourdhui = new Date();
            publication.setDatePub(aujourdhui);
            publicationRepository.save(publication);  // Save the updated publication
        }
    }
}