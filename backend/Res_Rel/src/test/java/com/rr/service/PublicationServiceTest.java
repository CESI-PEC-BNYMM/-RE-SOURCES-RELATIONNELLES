package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.Date;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;
import com.rr.services.PublicationService;

@SpringBootTest
public class PublicationServiceTest {

     @Autowired
    private PublicationRepository publicationRepository;

    @Autowired
    private PublicationService publicationService;

       @Test
    public void testDeletePublication() {
        // Créer une publication pour le test
        Publication publication = new Publication();
        publication.setIdPublication(1);
        publication.setDescription("This is a description of a test publication.");
        publication.setDatePub(new Date());
        publicationRepository.save(publication);

        // Vérifier que la publication a été enregistrée
        assertTrue(publicationRepository.existsById(publication.getIdPublication()));

        // Supprimer la publication
        publicationService.deletePublication(publication.getIdPublication());

        // Vérifier que la publication a été supprimée
        assertFalse(publicationRepository.existsById(publication.getIdPublication()));
    }
  
    
}
