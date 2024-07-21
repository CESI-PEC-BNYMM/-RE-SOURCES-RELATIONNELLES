package com.rr.service;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.entity.Citoyen;
import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;
import com.rr.services.PublicationService;

@SpringBootTest
public class PublicationServiceTest {

    @Autowired
    private PublicationService publicationService;

    @Autowired
    private PublicationRepository publicationRepository;

    
    private Citoyen citoyen1;
    private Citoyen citoyen2;
    private Publication publication1;
    private Publication publication2;

    @BeforeEach
    public void setup() {
        citoyen1 = new Citoyen();
        citoyen1.setNom("Dupont");
        citoyen1.setPrenom("Jean");
        citoyen1.setMail("jean.dupont@example.com");
        citoyen1.setNumTel("0612345678");
        citoyen1.setNumSec("12345678901234");
        citoyen1.setRole("citoyen");
        citoyen1.setDateNaissance(new Date());
        citoyen1.setSexe('M');
        citoyen1.setValidaton(true);
        citoyen1.setCodePostal("75000");
        citoyen1.setVille("Paris");
        citoyen1.setMdp("password1");

         citoyen2 = new Citoyen();
        citoyen2.setNom("Durand");
        citoyen2.setPrenom("Marie");
        citoyen2.setMail("marie.durand@example.com");
        citoyen2.setNumTel("0698765432");
        citoyen2.setNumSec("98765432109876");
        citoyen2.setRole("citoyen");
        citoyen2.setDateNaissance(new Date());
        citoyen2.setSexe('F');
        citoyen2.setValidaton(true);
        citoyen2.setCodePostal("75000");
        citoyen2.setVille("Paris");
        citoyen2.setMdp("password2");

        publication1 = new Publication();
        publication1.setIdPublication(5);
        publication1.setDescription("Description 1");
        publication1.setDatePub(new Date());
        publication1.setPubValidee(true);
        publication1.setPubSignalee(false);
        publication1.setCitoyen(citoyen1);

        publication2 = new Publication();
        publication2.setIdPublication(4);
        publication2.setDescription("Description 2");
        publication2.setDatePub(new Date());
        publication2.setPubValidee(false);
        publication2.setPubSignalee(false);
        publication2.setCitoyen(citoyen2);
        

        publicationRepository.save(publication1);
        publicationRepository.save(publication2);
    }

   /* @Test
    public void testFindByCitoyen() {
        List<Publication> publications = publicationService.findByCitoyen(citoyen1);
        assertThat(publications).isNotNull();
        assertThat(publications.size()).isEqualTo(1);
        assertThat(publications.get(0).getIdPublication()).isEqualTo(4);
    }*/

    @BeforeEach
    public void setUp() {
        publicationRepository = mock(PublicationRepository.class);
        publicationService = new PublicationService(publicationRepository);
    }
    /**
     * Test the deletion of a publication.
     *
     * @param  idPublication   the ID of the publication to delete
     * @return         	description of the test result
     */
    @Test
    public void testDeletePublication() {
        // Arrange
        int idPublication = 1;
        
        // Act
        publicationService.deletePublication(idPublication);
        
        // Assert
        verify(publicationRepository, times(1)).deleteById(idPublication);
    }

   @Test
    public void testReportPublication_ValidId() {
        Publication testPublication = new Publication();
        testPublication.setIdPublication(1);
        testPublication.setPubSignalee(false);
        
        when(publicationRepository.findById(1)).thenReturn(Optional.of(testPublication));
        
        Publication reportedPublication = publicationService.reportPublication(1);
        
        assertTrue(reportedPublication.isPubSignalee());
        verify(publicationRepository, times(1)).save(testPublication);
    }
    
    @Test
    public void testReportPublication_InvalidId() {
        when(publicationRepository.findById(2)).thenReturn(Optional.empty());
        
        assertThrows(NoSuchElementException.class, () -> {
            publicationService.reportPublication(2);
        });
        
        verify(publicationRepository, times(0)).save(any(Publication.class));
    }

    @Test
    public void testValidatePublication() {
        publicationService.validatePublication(publication2.getIdPublication());
        Optional<Publication> validatedPublication = publicationRepository.findById(publication2.getIdPublication());
        assertThat(validatedPublication).isNotEmpty();
        assertThat(validatedPublication.get().isPubValidee()).isTrue();
    }

    @Test
    public void testFindById() {
        Optional<Publication> foundPublication = publicationService.findById(publication1.getIdPublication());
        assertThat(foundPublication).isNotEmpty();
        assertThat(foundPublication.get().getIdPublication()).isEqualTo(4);
    }

    @Test
    public void testPublishPublication() {
        publicationService.validatePublication(publication2.getIdPublication());
        // publicationService.publishPublication(publication2.getIdPublication());
        Optional<Publication> publishedPublication = publicationRepository.findById(publication2.getIdPublication());
        assertThat(publishedPublication).isNotEmpty();
        assertThat(publishedPublication.get().getDatePub()).isNotNull();
    }
}
