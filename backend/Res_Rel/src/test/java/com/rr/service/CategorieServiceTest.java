package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;
import com.rr.services.CategorieService;

@SpringBootTest
class CategorieServiceTest {

    @Mock
    private CategorieRepository categorieRepository;

    private CategorieService categorieService;

    /**
     * Test case for the addCategorie method with valid input.
     * This test verifies that the addCategorie method correctly saves a new
     * Categorie object
     * to the database when given valid input parameters.
     */
    @Test
    void testAddCategorie_ValidInput() {
        // Create a new instance of CategorieService with a mock CategorieRepository
        CategorieService categorieService = new CategorieService(categorieRepository);

        // Call the addCategorie method with valid input parameters
        categorieService.addCategorie(1, "Books", true);

        // Verify that the save method of the CategorieRepository was called exactly
        // once
        // with any Categorie object as an argument. This is done using the verify
        // method
        // from the Mockito framework, which is used to check that the mock repository
        // was called as expected.
        verify(categorieRepository, times(1)).save(any(Categorie.class));
    }

    /**
     * Test case for the addCategorie method with a negative ID.
     * This test verifies that the addCategorie method correctly throws an
     * IllegalArgumentException when given a negative ID.
     */
    @Test
    void testAddCategorie_NegativeId() {
        // Create a new instance of CategorieService with a mock CategorieRepository
        CategorieService categorieService = new CategorieService(categorieRepository);

        // Call the addCategorie method with a negative ID
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            categorieService.addCategorie(-1, "Electronics", true);
        });

        // Verify that the correct error message is thrown
        assertEquals("ID must be a positive integer", exception.getMessage());
    }

    /**
     * Test case for the addCategorie method with an empty name.
     * This test verifies that the addCategorie method correctly throws an
     * IllegalArgumentException when given an empty name.
     */
    @Test
    void testAddCategorie_EmptyName() {
        // Create a new instance of CategorieService with a mock CategorieRepository
        CategorieService categorieService = new CategorieService(categorieRepository);

        // Call the addCategorie method with an empty name
        IllegalArgumentException exception = assertThrows(IllegalArgumentException.class, () -> {
            categorieService.addCategorie(2, "", true);
        });

        // Verify that the correct error message is thrown
        assertEquals("Libelle cannot be null or empty", exception.getMessage());
    }

    /**
     * Test case for the findByIdCategorie method with a valid ID.
     * This test verifies that the findByIdCategorie method correctly returns the
     * expected category
     * when given a valid ID.
     */
    @Test
    void testFindCategoryById_ValidId() {
        // Mocking the behavior of categorieRepository

        // Create an instance of Categorie to be returned by the mock repository
        Categorie expectedCategory = new Categorie();

        // Configure the mock repository to return the expected category when
        // findByIdCategorie is called with ID 1
        when(categorieRepository.findByIdCategorie(1)).thenReturn(Optional.of(expectedCategory));

        // Create a new instance of CategorieService with the mock repository
        categorieService = new CategorieService(categorieRepository);

        // Call the findByIdCategorie method with ID 1
        Optional<Categorie> result = categorieService.findByIdCategorie(1);

        // Verify that the result contains the expected category
        assertEquals(expectedCategory, result.get());
    }

    /**
     * Test case for the findByIdCategorie method with an invalid ID.
     * This test verifies that the findByIdCategorie method correctly throws a
     * RuntimeException when given an invalid ID.
     */
    @Test
    void testFindCategoryById_InvalidId() {
        // Mocking the behavior of categorieRepository
        // When findByIdCategorie is called with any ID, return null
        when(categorieRepository.findByIdCategorie(anyInt())).thenReturn(null);

        // Create a new instance of CategorieService with the mock repository
        categorieService = new CategorieService(categorieRepository);

        // Verify that calling findByIdCategorie with an invalid ID throws a
        // RuntimeException
        assertThrows(RuntimeException.class, () -> {
            categorieService.findByIdCategorie(-1);
        });
    }

    // @Test
    // void testFindByActif_InvalidState() {
    //     // Arrange
    //     boolean actif = true;
    //     when (categorieRepository.findByActif(actif)).thenReturn(new ArrayList<>());

    //     // Act
    //     Exception exception = assertThrows(RuntimeException.class, () -> {
    //         categorieService.findByActif(actif);
    //     });

    //     // Assert
    //     assertEquals("Aucune Categorie n'existe avec cet etat", exception.getMessage());
    // }
}
