package com.rr.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.services.AuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    /**
     * Authenticate a user and generate a login token.
     *
     * @param mail The email address of the user.
     * @param motDePasse The password of the user.
     * @return A login token if authentication is successful, or an error message.
     * @example POST /auth/login?mail=user@example.com&motDePasse=password
     * Response: HTTP 200 OK with the login token or HTTP 401 UNAUTHORIZED with an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String mail, @RequestParam String motDePasse) {
        try {
            Map<String, String> userInfos = authService.login(mail, motDePasse);
            return new ResponseEntity<>(userInfos, HttpStatus.OK);
        } catch (BadCredentialsException e) {
            System.err.println("Invalid credentials: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid credentials");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        } catch (Exception e) {
            System.err.println("Error during login: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error during login");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * Register a new user.
     *
     * @param mail The email address of the user.
     * @param motDePasse The password of the user.
     * @param nom The last name of the user.
     * @param prenom The first name of the user.
     * @param numTel The phone number of the user.
     * @param numSec The social security number of the user.
     * @param dateNaissance The date of birth of the user.
     * @param sexe The gender of the user.
     * @param codePostal The postal code of the user's address.
     * @param ville The city of the user's address.
     * @return A success message if registration is successful, or an error message.
     * @example POST /auth/signup?mail=user@example.com&motDePasse=password&nom=Doe&prenom=John&numTel=1234567890&numSec=123-45-6789&dateNaissance=2000-01-01&sexe=M&codePostal=12345&ville=SomeCity
     * Response: HTTP 200 OK with a success message or HTTP 400 BAD REQUEST with an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestParam String mail, @RequestParam String motDePasse,
                                     @RequestParam String nom, @RequestParam String prenom,
                                     @RequestParam String numTel, @RequestParam String numSec,
                                     @RequestParam Date dateNaissance, @RequestParam char sexe,
                                     @RequestParam String codePostal, @RequestParam String ville) {
        try {
            String responseMessage = authService.signup(mail, motDePasse, nom, prenom, numTel, numSec, dateNaissance, sexe, codePostal, ville);
            return new ResponseEntity<>(responseMessage, HttpStatus.CREATED);
        } catch (BadCredentialsException e) {
            System.err.println("Invalid credentials: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Invalid credentials");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.UNAUTHORIZED);
        }
        
        catch (Exception e) {
            System.err.println("Error during signup: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error during signup");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}