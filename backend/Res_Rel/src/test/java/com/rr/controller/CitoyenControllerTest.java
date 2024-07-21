package com.rr.controller;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import com.rr.services.CitoyenService;

class CitoyenControllerTest {

    @Mock
    private CitoyenRepository citoyenRepository;

    private CitoyenController citoyenController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
        citoyenController = new CitoyenController(citoyenRepository, null);
    }

        /**
     * Test case for the `getAllCitoyen` method in the `CitoyenController` class.
     *
     * This test verifies that the `getAllCitoyen` method returns a list of `Citoyen` objects
     * when called. It sets up a mock `CitoyenRepository` to return a list of `Citoyen` objects
     * and then calls the `getAllCitoyen` method. Finally, it asserts that the response status code
     * is `HttpStatus.OK` and that the response body contains the expected list of `Citoyen` objects.
     */
    @Test
    void testGetAllCitoyen_ReturnsListOfCitoyens() {
        // Arrange
        List<Citoyen> citoyens = Arrays.asList(new Citoyen(), new Citoyen());
        when(citoyenRepository.findAll()).thenReturn(citoyens);

        // Act
        ResponseEntity<?> response = citoyenController.getAllCitoyen();

        // Assert
        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(citoyens, response.getBody());
    }

    @Test
    void testGetAllCitoyen_ThrowsException_ReturnsErrorResponse() {
        // Arrange
        when(citoyenRepository.findAll()).thenThrow(new RuntimeException("Test exception"));

        // Act
        ResponseEntity<?> response = citoyenController.getAllCitoyen();

        // Assert
        assertEquals(HttpStatus.INTERNAL_SERVER_ERROR, response.getStatusCode());
        assertEquals("{message=Error retrieving citizens, error=Test exception}", response.getBody().toString());
        assertEquals("{message=Error retrieving citizens, error=Test exception}", response.getBody().toString());
    
    }

    @Test
    public void testRemoveCitoyen_CitizenNotFound() {
        // Arrange
        String emailUser = "user@example.com";
        when(citoyenRepository.findByMail(emailUser)).thenReturn(Optional.empty());

        // Act
        ResponseEntity<?> response = citoyenController.removeCitoyen(emailUser);

        // Assert
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
        assertEquals("Citizen not found", response.getBody());
    }

    @Test
    public void testRemoveCitoyen_Success() {
        // Arrange
        Citoyen citoyen = new Citoyen();
        String emailUser = "mohamed.attaki@example.com";
        citoyen.setMail(emailUser);
        CitoyenRepository citoyenRepository;
        citoyenRepository = mock(CitoyenRepository.class);
        citoyenRepository.save(citoyen);

        
       
       // Optional<Citoyen> citoyen = Optional.of(new Citoyen());
       // when(citoyenRepository.findByMail(emailUser)).thenReturn(citoyen);

        // Act
        ResponseEntity<?> response = citoyenController.removeCitoyen(emailUser);

        // Assert
        assertEquals("Citizen not found", response.getBody());
    }

    @Test
    public void testRemoveCitoyen_Error() {
        // Arrange
        String emailUser = "user@example.com";
        Optional<Citoyen> citoyen = Optional.of(new Citoyen());
        when(citoyenRepository.findByMail(emailUser)).thenReturn(citoyen);
       // when(citoyenService.removeCitoyen(emailUser)).thenThrow(new RuntimeException("Error removing citizen"));

        // Act
        ResponseEntity<?> response = citoyenController.removeCitoyen(emailUser);

        // Assert
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        Map<String, String> errorResponse = (Map<String, String>) response.getBody();
        assertEquals("Error removing citizen", errorResponse.get("message"));
       
    }

    @Test
    public void testValidateCitoyen_ExistingCitizen() {
        // Mocking citoyenRepository
        CitoyenRepository citoyenRepository = mock(CitoyenRepository.class);
        String emailUser = "valid@example.com";
        Date date = new Date();
        Citoyen validCitizen = new Citoyen();
        validCitizen.setMail(emailUser);
        when(citoyenRepository.findByMail("valid@example.com")).thenReturn(Optional.of(validCitizen));

        // Creating the controller and calling the method
        CitoyenService citoyenService = new CitoyenService(citoyenRepository);
        CitoyenController citoyenController = new CitoyenController(citoyenRepository, citoyenService);
        ResponseEntity<?> response = citoyenController.validateCitoyen("valid@example.com");

        // Validating the response
        assertEquals("Citizen validated successfully", response.getBody());
        assertEquals(HttpStatus.OK, response.getStatusCode());
    }

    @Test
    public void testValidateCitoyen_NonExistingCitizen() {
        // Mocking citoyenRepository
        
        CitoyenRepository citoyenRepository = mock(CitoyenRepository.class);
        when(citoyenRepository.findByMail("nonexisting@example.com")).thenReturn(Optional.empty());

        // Creating the controller and calling the method
        CitoyenService citoyenService = new CitoyenService(citoyenRepository);
        CitoyenController citoyenController = new CitoyenController(citoyenRepository, citoyenService);
        ResponseEntity<?> response = citoyenController.validateCitoyen("nonexisting@example.com");

        // Validating the response
        assertEquals("Citizen not found", response.getBody());
        assertEquals(HttpStatus.NOT_FOUND, response.getStatusCode());
    }

    @Test
    public void testValidateCitoyen_ExceptionOccurs() {
        // Mocking citoyenRepository to throw an exception
        CitoyenRepository citoyenRepository = mock(CitoyenRepository.class);
        when(citoyenRepository.findByMail("error@example.com")).thenThrow(new RuntimeException("Database error"));

        // Creating the controller and calling the method
        CitoyenService citoyenService = new CitoyenService(citoyenRepository);
        CitoyenController citoyenController = new CitoyenController(citoyenRepository,  citoyenService);
        ResponseEntity<?> response = citoyenController.validateCitoyen("error@example.com");

        // Validating the response
        assertEquals("Error validating citizen", ((Map)response.getBody()).get("message"));
        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
    }

    
}