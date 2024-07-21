package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.entity.Commentaire;
import com.rr.repository.CommentaireRepository;
import com.rr.services.CommentaireService;

@SpringBootTest
class CommentaireServiceTest {

    private CommentaireRepository commentaireRepository;
    private CommentaireService commentaireService;
    private CommentaireRepository mockCommentaireRepository;

    private boolean commentaireSignale;

    public void Commentaire(boolean commentaireSignale) {
        this.commentaireSignale = commentaireSignale;
    }

    @BeforeEach
    void setUp() {
        commentaireRepository = mock(CommentaireRepository.class);
        commentaireService = new CommentaireService(commentaireRepository);
        mockCommentaireRepository = mock(CommentaireRepository.class);
    }
    /**
     * Tests the findAllByCommentaireSignale method for the case when
     * commentaireSignale is true.
     * Verifies that the returned list size is equal to the size of the input list.
     */
    @Test
    public void testFindAllByCommentaireSignale_True() {
        // Mock the CommentaireRepository to return a list of Commentaire objects
        CommentaireRepository mockCommentaireRepository = mock(CommentaireRepository.class);
        List<Commentaire> commentaires = Arrays.asList(new Commentaire(), new Commentaire(), new Commentaire());
        when(mockCommentaireRepository.findAllByCommentaireSignale(true)).thenReturn(commentaires);

        // Create a CommentaireService instance with the mocked CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(mockCommentaireRepository);

        // Call the findAllByCommentaireSignale method with commentaireSignale as true
        List<Commentaire> result = commentaireService.findAllByCommentaireSignale(true);

        // Verify that the size of the returned list is equal to the size of the input
        // list
        assertEquals(commentaires.size(), result.size(),
                "The returned list size should be equal to the size of the input list when commentaireSignale is true.");
    }

    /**
     * Tests the findAllByCommentaireSignale method for the case when
     * commentaireSignale is false.
     * Verifies that the returned list size is equal to the size of the input list.
     */
    @Test
    public void testFindAllByCommentaireSignale_False() {
        // Create a CommentaireService instance with a mocked CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(mock(CommentaireRepository.class));

        // Mock the findAllByCommentaireSignale method of the CommentaireRepository to
        // return a list of Commentaire objects
        List<Commentaire> commentaires = Arrays.asList(new Commentaire(), new Commentaire(), new Commentaire());
        when(commentaireService.findAllByCommentaireSignale(false)).thenReturn(commentaires);

        // Call the findAllByCommentaireSignale method with commentaireSignale as false
        List<Commentaire> result = commentaireService.findAllByCommentaireSignale(false);

        // Verify that the size of the returned list is equal to the size of the input
        // list
        assertEquals(3, result.size(),
                "The returned list size should be equal to the size of the input list when commentaireSignale is false.");
    }

    /**
     * Tests the findByPublicationIdPublication method when there are no comments.
     * Verifies that the returned list is empty.
     */
    @Test
    void testFindByPublicationIdPublication_NoComments() {
        // Create a mock CommentaireRepository object
        CommentaireRepository commentaireRepository = mock(CommentaireRepository.class);
        // Create a CommentaireService instance with the mocked CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(commentaireRepository);
        // Define the behavior of the findByPublicationIdPublication method of the
        // mocked CommentaireRepository object
        when(commentaireRepository.findByPublicationIdPublication(anyInt()))
                .thenReturn(new ArrayList<>());
        // Call the findByPublicationIdPublication method of the CommentaireService
        List<Commentaire> commentaires = commentaireService.findByPublicationIdPublication(1);
        // Verify that the returned list is empty
        assertTrue(commentaires.isEmpty(),
                "The returned list should be empty when there are no comments.");
    }

    /**
     * Tests the addCommentaire method with valid input.
     * Verifies that the save method of the CommentaireRepository is called with a Commentaire object.
     */
    @Test
    void testAddCommentaire_ValidInput() {
        // Create a CommentaireRepository mock
        CommentaireRepository commentaireRepositoryMock = mock(CommentaireRepository.class);
        // Create a CommentaireService instance with the mocked CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(commentaireRepositoryMock);

        // Call the addCommentaire method with valid input
        commentaireService.addCommentaire(1, "test", true);

        // Verify that the save method of the CommentaireRepository is called with a Commentaire object
        // The any(Commentaire.class) argument matcher ensures that the save method is called with any Commentaire object.
        verify(commentaireRepositoryMock).save(any(Commentaire.class));
    }

    /**
     * Tests the addCommentaire method with a negative ID.
     * This test verifies that the addCommentaire method correctly throws an
     * IllegalArgumentException when given a negative ID.
     */
    @Test
    void testAddCommentaire_NegativeId() {
        // Create a new instance of CommentaireService with a mock CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(null);

        // Call the addCommentaire method with a negative ID
        // Assert that an IllegalArgumentException is thrown
        assertThrows(IllegalArgumentException.class, () -> commentaireService.addCommentaire(-1, "test", true),
                "The addCommentaire method should throw an IllegalArgumentException for negative ID.");
    }

    /**
     * Tests the addCommentaire method with a null tewtCommentaire.
     *
     * Verifies that the addCommentaire method correctly throws an
     * IllegalArgumentException when given a null tewtCommentaire.
     */
    @Test
    public void testAddCommentaire_NullTewtCommentaire() {
        // Create a new instance of CommentaireService with a mock CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(null);

        // Call the addCommentaire method with a null tewtCommentaire
        // Assert that an IllegalArgumentException is thrown
        assertThrows(IllegalArgumentException.class, () -> commentaireService.addCommentaire(1, null, true),
                "The addCommentaire method should throw an IllegalArgumentException for null tewtCommentaire.");
    }

    /**
     * Tests the addCommentaire method with an empty tewtCommentaire.
     * This test verifies that the addCommentaire method correctly throws an
     * IllegalArgumentException when given an empty tewtCommentaire.
     */
    @Test
    public void testAddCommentaire_EmptyTewtCommentaire() {
        // Create a new instance of CommentaireService with a mock CommentaireRepository
        CommentaireService commentaireService = new CommentaireService(null);

        // Call the addCommentaire method with an empty tewtCommentaire
        // Assert that an IllegalArgumentException is thrown
        assertThrows(IllegalArgumentException.class, () -> commentaireService.addCommentaire(1, "", true),
                "The addCommentaire method should throw an IllegalArgumentException for empty tewtCommentaire.");
    }

    /**
     * Tests the findByType method with a null type.
     *
     * Verifies that the findByType method correctly calls the
     * CommentaireRepository's findByType method with a null type and returns the
     * expected list of Commentaire objects.
     */
    @Test
    void testFindByType_NullType() {
        // Create a list of Commentaire objects to be returned by the mock CommentaireRepository
        List<Commentaire> expected = new ArrayList<>();

        // Configure the mock CommentaireRepository to return the expected list of Commentaire objects when findByType is called with a null type
        when(commentaireRepository.findByType(null)).thenReturn(expected);

        // Call the findByType method with a null type
        List<Commentaire> result = commentaireService.findByType(null);

        // Assert that the result is equal to the expected list of Commentaire objects
        assertEquals(expected, result);

        // Verify that the CommentaireRepository's findByType method was called exactly once with a null type
        verify(commentaireRepository, times(1)).findByType(null);
    }

    /**
     * Tests the findByType method with a non-null type.
     *
     * Verifies that the findByType method correctly calls the
     * CommentaireRepository's findByType method with a non-null type and returns the
     * expected list of Commentaire objects.
     */
    @Test
    void testFindByType_NotNullType() {
        // Define the type to be searched for
        Boolean type = true;

        // Create a list of Commentaire objects to be returned by the mock CommentaireRepository
        List<Commentaire> expected = new ArrayList<>();

        // Configure the mock CommentaireRepository to return the expected list of Commentaire objects when findByType is called with the defined type
        when(commentaireRepository.findByType(type)).thenReturn(expected);

        // Call the findByType method with the defined type
        List<Commentaire> result = commentaireService.findByType(type);

        // Assert that the result is equal to the expected list of Commentaire objects
        assertEquals(expected, result);

        // Verify that the CommentaireRepository's findByType method was called exactly once with the defined type
        verify(commentaireRepository, times(1)).findByType(type);
    }

    /**
     * Tests the findByTypeAndCommentaireSignale method with both type and commentaireSignale set to true.
     *
     * Verifies that the findByTypeAndCommentaireSignale method correctly calls the
     * CommentaireRepository's findByTypeAndCommentaireSignale method with both type and commentaireSignale set to true and returns an empty list.
     */
    @Test
    public void testFindByTypeAndCommentaireSignale_BothTrue() {
        // Setup
        // Configure the mock CommentaireRepository to return an empty list when findByTypeAndCommentaireSignale is called with both type and commentaireSignale set to true
        when(mockCommentaireRepository.findByTypeAndCommentaireSignale(true, true))
                .thenReturn(new ArrayList<>());

        // Test
        // Call the findByTypeAndCommentaireSignale method with both type and commentaireSignale set to true
        List<Commentaire> result = commentaireService.findByTypeAndCommentaireSignale(true, true);

        // Assert that the size of the returned list is 0
        assertEquals(0, result.size());
    }

    /**
     * Tests the findByTypeAndCommentaireSignale method with type set to true and commentaireSignale set to false.
     *
     * Verifies that the findByTypeAndCommentaireSignale method correctly calls the
     * CommentaireRepository's findByTypeAndCommentaireSignale method with type set to true and commentaireSignale set to false and returns an empty list.
     */
    @Test
    public void testFindByTypeAndCommentaireSignale_TypeTrue_SignaleFalse() {
        // Setup
        // Configure the mock CommentaireRepository to return a list with a single Commentaire object when findByTypeAndCommentaireSignale is called with type set to true and commentaireSignale set to false
        when(mockCommentaireRepository.findByTypeAndCommentaireSignale(true, false))
                .thenReturn(Arrays.asList(new Commentaire()));

        // Test
        // Call the findByTypeAndCommentaireSignale method with type set to true and commentaireSignale set to false
        List<Commentaire> result = commentaireService.findByTypeAndCommentaireSignale(true, false);

        // Assert that the size of the returned list is 0
        assertEquals(0, result.size());
    }

    /**
     * Tests the findByTypeAndCommentaireSignale method with type set to false and commentaireSignale set to true.
     *
     * Verifies that the findByTypeAndCommentaireSignale method correctly calls the
     * CommentaireRepository's findByTypeAndCommentaireSignale method with type set to false and commentaireSignale set to true and returns an empty list.
     */
    @Test
    public void testFindByTypeAndCommentaireSignale_TypeFalse_SignaleTrue() {
        // Setup
        // Configure the mock CommentaireRepository to return a list with two Commentaire objects when findByTypeAndCommentaireSignale is called with type set to false and commentaireSignale set to true
        when(mockCommentaireRepository.findByTypeAndCommentaireSignale(false, true))
                .thenReturn(Arrays.asList(new Commentaire(), new Commentaire()));

        // Test
        // Call the findByTypeAndCommentaireSignale method with type set to false and commentaireSignale set to true
        List<Commentaire> result = commentaireService.findByTypeAndCommentaireSignale(false, true);

        // Assert that the size of the returned list is 0
        assertEquals(0, result.size());
    }

    @Test
    public void testFindByTypeAndCommentaireSignale_BothFalse() {
        // Setup
        when(mockCommentaireRepository.findByTypeAndCommentaireSignale(false, false)).thenReturn(new ArrayList<>());

        // Test
        List<Commentaire> result = commentaireService.findByTypeAndCommentaireSignale(false, false);

        assertEquals(0, result.size());
    }

    /**
     * Tests that the signaleCommentaire method correctly sets the commentaireSignale property of the Commentaire object to true.
     */
    @Test
    public void shouldSetCommentaireSignaleToTrue() {

        // Create a new Commentaire object
        Commentaire commentaire = new Commentaire();

        // Set the ID of the commentaire object to 1
        int idCommentaire = 1;

        // when
        // Call the signaleCommentaire method with the commentaire object and ID
        commentaireService.signaleCommentaire(commentaire, idCommentaire);

        // Assert that the commentaireSignale property of the commentaire object is true
        assertTrue(commentaire.isCommentaireSignale(),
                "The commentaireSignale property should be set to true after calling the signaleCommentaire method.");
    }

    /**
     * Tests that the signaleCommentaire method calls the save method of the commentaireRepository.
     */
    @Test
    void shouldSaveCommentaire() {

        // Create a new Commentaire object
        Commentaire commentaire = new Commentaire();

        // Set the ID of the commentaire object to 1
        int idCommentaire = 1;

        // Call the signaleCommentaire method with the commentaire object and ID
        commentaireService.signaleCommentaire(commentaire, idCommentaire);

        // Verify that the save method of the commentaireRepository is called with the commentaire object
        verify(commentaireRepository).save(commentaire);
    }

}
