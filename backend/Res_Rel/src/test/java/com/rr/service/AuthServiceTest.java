package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Date;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import com.rr.services.AuthService;


@SpringBootTest
class AuthServiceTest {

    @Autowired
    private CitoyenRepository utilisateurRepository;

    public AuthServiceTest(CitoyenRepository utilisateurRepository) {
        this.utilisateurRepository = utilisateurRepository;
    }

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Autowired
    private AuthService authService;

    @Test
    void testLoginSuccess() {
        // arange
        String mail = "jean.dupont@example.com";
        String motdePasse = "password";
        Citoyen citoyen = new Citoyen();
        citoyen.setMail(mail);
        
        PasswordEncoder bcrypt = new BCryptPasswordEncoder();
        System.out.println(bcrypt.encode(motdePasse));
        citoyen.setMdp(bcrypt.encode(motdePasse));

        // act
        when(this.utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));
        
        String result = authService.login(mail, motdePasse);
        
        // assert
        assertEquals("Connexion reussie", result);
    }

    @Test
    void testLoginWrongPassword() {
        // Arrange
        String mail = "jean.dupont@example.com";
        String motdePasse = "password";
        Citoyen citoyen = new Citoyen();
        citoyen.setMail(mail);
        citoyen.setMdp(passwordEncoder.encode("wrongPassword"));

        // Act
        when(utilisateurRepository.findByMail(mail)).thenReturn(Optional.of(citoyen));
        
        String result = authService.login(mail, motdePasse);
        
        // Assert
        assertEquals("Identifiant ou mot de passe incorrect", result);
    }

   @Test
void testLoginUserNotFound() {
    // Arrange
    String mail = "test@example.com";
    String motdePasse = "password";

    // Créer un mock de l'utilisateurRepository
        CitoyenRepository citoyenRepositoryMock = Mockito.mock(utilisateurRepository.class);

    // Stubber la méthode findByMail pour renvoyer une valeur vide
    when(citoyenRepositoryMock.findByMail(mail)).thenReturn(Optional.empty());

    // Injecter le mock dans le service à tester
    AuthService authService = new AuthService(citoyenRepositoryMock);

    // Act
    String result = authService.login(mail, motdePasse);

    // Assert
    assertEquals("Identifiant ou mot de passe incorrect", result);
}

    @Test
    void testSignup_ExistingEmail() {
        // Arrange
        String mail = "jean.dupont@example.com";
        String motdePasse = "password";
        String prenom = "John";
        String nom = "Doe";
        String num_Tel = "0612457863";
        String num_Sec = "123456789";
        String date_Naissance = "1990-01-01";
        char sexe = 'M';
        String code_postal = "75000";
        String ville = "Paris";
        Citoyen citoyen = new Citoyen();

        // Act
        String result = authService.signup(mail, motdePasse, prenom, nom, num_tel, num_sec, date_Naissance, sexe, code_postal, ville);

        // Assert
        assertEquals("Echec lors de l'inscription. Cet identifiant est déjà utilisé", result);
    }

    @Test
    public void testSignup_NewUser() {
        // Arrange
        String newEmail = "newuser@example.com";
        String password = "password123";
        String firstName = "John";
        String lastName = "Doe";
        String phoneNumber = "1234567890";
        String socialSecurityNumber = "111-11-1111";
        Date birthDate = new Date();
        char gender = 'M';
        String postalCode = "12345";
        String city = "New York";

        // Act
        String result = authService.signup(newEmail, password, firstName, lastName, phoneNumber, socialSecurityNumber,
                birthDate, gender, postalCode, city);

        // Assert
        assertEquals("Inscription réussi", result);
    }
}
