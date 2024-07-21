package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.Optional;

import org.hibernate.mapping.Map;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import com.rr.services.AuthService;

@SpringBootTest
class AuthServiceTest {

    private AuthService authService;
    private CitoyenRepository utilisateurRepository;
    private BCryptPasswordEncoder passwordEncoder;

    /**
     * This function is called before each test case is executed and it is used to set up the environment for the tests.
     * It creates mock objects for the CitoyenRepository and BCryptPasswordEncoder classes, initializes the AuthService
     * object with these mock objects, and assigns the passwordEncoder of the AuthService object to the mock object.
     */
    @BeforeEach
    void setUp() {
        // Create mock objects for the CitoyenRepository and BCryptPasswordEncoder classes
        utilisateurRepository = mock(CitoyenRepository.class); // Mock object for CitoyenRepository
        passwordEncoder = mock(BCryptPasswordEncoder.class); // Mock object for BCryptPasswordEncoder

        // Initialize the AuthService object with the mock objects
        authService = new AuthService(utilisateurRepository); // Create AuthService object with mock CitoyenRepository
        authService.passwordEncoder = passwordEncoder; // Assign the mock BCryptPasswordEncoder to the AuthService object
    }

    // /**
    //  * Test case for a valid user login.
    //  * It checks if the login method returns a non-null result when given valid credentials.
    //  * It verifies that the login method can successfully authenticate a user.
    //  */
    // @Test
    // void testValidUserLogin() {
    //     // Arrange
    //     String mail = "Blanc.henry@mail.com"; // Valid user email
    //     String mdp = "test"; // Valid user password
    //     Citoyen citoyen = new Citoyen(); // Create a new Citoyen object
    //     citoyen.setMail(mail); // Set the email of the Citoyen object
    //     citoyen.setMdp(mdp); // Set the password of the Citoyen object

    //     // Mock the findByMail method of the CitoyenRepository to return an Optional containing the Citoyen object
    //     when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));

    //     // Mock the matches method of the BCryptPasswordEncoder to return true when given the valid password
    //     when(passwordEncoder.matches(mdp, citoyen.getMdp())).thenReturn(true);

    //     try {
    //         // Act
    //         java.util.Map<String, String>result = authService.login(mail, mdp); // Call the login method with valid credentials

    //         // Assert
    //         assertNotNull(result); // Verify that the result is not null
    //         // Add more assertions based on the expected userInfos map content

    //     } catch (BadCredentialsException e) {
    //         // Handle the exception
    //         String result = e.getMessage(); // Get the error message from the exception
    //         fail("Unexpected exception: " + result);
    //     }
    //     System.out.println("testValidUserLogin passed");
    // }

/**
     * Test case for an incorrect email login.
     * It checks if the login method throws a BadCredentialsException when given an incorrect email.
     * It verifies that the login method correctly handles an invalid email.
     */
    @Test
    void testIncorrectmail() {
        // Arrange
        String mail = "nonexistent@example.com"; // Non-existent user email
        String mdp = "mdp123"; // Valid password
        Citoyen citoyen = new Citoyen(); // Create a new Citoyen object
        citoyen.setMail(mail); // Set the email of the Citoyen object
        citoyen.setMdp(mdp); // Set the password of the Citoyen object

        // Mock the findByMail method of the CitoyenRepository to return an Optional containing the Citoyen object
        when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));

        try {
            // Act and Assert
            assertThrows(BadCredentialsException.class, () -> authService.login(mail, mdp)); // Expect a BadCredentialsException
        } catch (BadCredentialsException e) {
            String result = e.getMessage(); // Get the error message from the exception
            assertEquals("Email ou mot de passe incorrect", result); // Verify that the error message is correct
        }
        
    }

    /**
     * Test case for an incorrect password login.
     * It checks if the login method throws a BadCredentialsException when given an incorrect password.
     * It verifies that the login method correctly handles an invalid password.
     */
    @Test
    void testIncorrectmdp() {
        // Arrange
        String mail = "Blanc.henry@mail.com"; // Valid user email
        String mdp = "wrongmdp"; // Incorrect password
        Citoyen citoyen = new Citoyen(); // Create a new Citoyen object
        citoyen.setMail(mail); // Set the email of the Citoyen object
        citoyen.setMdp("mdp123"); // Set the password of the Citoyen object

        // Mock the findByMail method of the CitoyenRepository to return an Optional containing the Citoyen object
        when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));

        // Mock the matches method of the BCryptPasswordEncoder to return false when given the incorrect password
        when(passwordEncoder.matches(mdp, citoyen.getMdp())).thenReturn(false);

        // Act and Assert
        assertThrows(BadCredentialsException.class, () -> authService.login(mail, mdp));
    }


    /**
     * Test case for a user who is not validated login.
     * It checks if the login method throws a BadCredentialsException when given an email of a user who is not validated.
     * It verifies that the login method correctly handles an invalid user validation.
     */
    @Test
    void testUserNotValidated() {
        // Arrange
        String mail = "test@example.com"; // Email of a user who is not validated
        String mdp = "mdp123"; // Valid password
        Citoyen citoyen = new Citoyen(); // Create a new Citoyen object
        citoyen.setMail(mail); // Set the email of the Citoyen object
        citoyen.setMdp(mdp); // Set the password of the Citoyen object
        citoyen.setValidaton(false); // Set the validation of the Citoyen object to false

        // Mock the findByMail method of the CitoyenRepository to return an Optional containing the Citoyen object
        when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));

        // Mock the matches method of the BCryptPasswordEncoder to return true when given the valid password
        when(passwordEncoder.matches(mdp, citoyen.getMdp())).thenReturn(true);

        // Act and Assert
        assertThrows(BadCredentialsException.class, () -> authService.login(mail, mdp)); // Expect a BadCredentialsException
    }

    /**
     * Test case for a deactivated user login.
     * It checks if the login method throws a BadCredentialsException when given an email of a deactivated user.
     * It verifies that the login method correctly handles a deactivated user.
     */
    @Test
    void testUserDeactivated() {
        // Arrange
        String mail = "test@example.com";
        String mdp = "mdp123";
        Citoyen citoyen = new Citoyen();
        citoyen.setMail(mail);
        citoyen.setMdp(mdp);
        citoyen.setActif(false); // Set the user as deactivated

        // Mock the findByMail method of the CitoyenRepository to return an Optional containing the Citoyen object
        when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));

        // Mock the matches method of the BCryptPasswordEncoder to return true when given the valid password
        when(passwordEncoder.matches(mdp, citoyen.getMdp())).thenReturn(true);

        // Act and Assert
        assertThrows(BadCredentialsException.class, () -> authService.login(mail, mdp)); // Expect a BadCredentialsException
    }

    /**
     * Test case for a user not found in the database.
     * It checks if the login method throws a BadCredentialsException when given an email that does not exist in the database.
     * It verifies that the login method correctly handles a user not found.
     */
    @Test
    void testLoginUserNotFound() {
        // Arrange
        String mail = "test@example.com";
        String motdePasse = "mdp";

        // Créer un mock de l'utilisateurRepository
        CitoyenRepository citoyenRepositoryMock = Mockito.mock(CitoyenRepository.class);

        // Stubber la méthode findByMail pour renvoyer une valeur vide
        when(citoyenRepositoryMock.findByMail(mail)).thenReturn(Optional.empty());

        // Act
        try {
            java.util.Map<String, String> result = this.authService.login(mail, motdePasse);
        } catch (BadCredentialsException e) {
            String result = e.getMessage();

            // Assert
            assertEquals("Email ou mot de passe incorrect", result);
        }
    }

    @Test
     void testSignup_newUser_success() {
        String mail = "test@example.com";
        String motdePasse = "password";
        String nom = "Doe";
        String prenom = "John";
        String numTel = "1234567890";
        String numSec = "9876543210";
        Date dateNaissance = new Date();
        char sexe = 'M';
        String codePostal = "12345";
        String ville = "City";
    
        Mockito.when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.empty());
        Mockito.when(passwordEncoder.encode(motdePasse)).thenReturn("hashedPassword");
    
        String result = authService.signup(mail, motdePasse, nom, prenom, numTel, numSec, dateNaissance, sexe, codePostal, ville);
    
        Assertions.assertEquals("Inscription réussi", result);
        Mockito.verify(utilisateurRepository, Mockito.times(1)).save(Mockito.any(Citoyen.class));
    }
    
    @Test
    void testSignup_existingUser_throwsException() {
        String mail = "test@example.com";
        String motdePasse = "password";
        String nom = "Doe";
        String prenom = "John";
        String numTel = "1234567890";
        String numSec = "9876543210";
        Date dateNaissance = new Date();
        char sexe = 'M';
        String codePostal = "12345";
        String ville = "City";
    
        Mockito.when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(new Citoyen()));
    
        Assertions.assertThrows(BadCredentialsException.class, () -> {
            authService.signup(mail, motdePasse, nom, prenom, numTel, numSec, dateNaissance, sexe, codePostal, ville);
        });
        Mockito.verify(utilisateurRepository, Mockito.times(0)).save(Mockito.any(Citoyen.class));
    }

}
