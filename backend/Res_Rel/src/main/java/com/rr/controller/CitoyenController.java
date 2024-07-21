package com.rr.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;
import com.rr.services.CitoyenService;

@Controller
@RestController
@RequestMapping("/citoyen")
public class CitoyenController {

    private final CitoyenRepository citoyenRepository;

    public CitoyenController(CitoyenRepository citoyenRepository) {
        this.citoyenRepository = citoyenRepository;
    }

    /**
     * Retrieve a list of all citizens.
     *
     * @return A list of all citizens.
     * @example GET /citoyen/list
     * Response: HTTP 200 OK with a list of citizens.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list")
    public ResponseEntity<?> getAllCitoyen() {
        try {

            List<Citoyen> citoyens = citoyenRepository.findAll();
            return new ResponseEntity<>(citoyens, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error retrieving citizens: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving citizens");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Remove a citizen by their email address.
     *
     * @param emailUser The email address of the citizen to remove.
     * @return A success message if the removal is successful, or an error message.
     * @example POST /citoyen/remove/user@example.com
     * Response: HTTP 200 OK with a success message or HTTP 400 BAD REQUEST with an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/remove/{emailUser}")
    public ResponseEntity<?> removeCitoyen(@PathVariable String emailUser) {
        try {
            Optional<Citoyen> citoyen = citoyenRepository.findByMail(emailUser);
            if (citoyen.isEmpty()) {
                return new ResponseEntity<>("Citizen not found", HttpStatus.NOT_FOUND);
            }
            CitoyenService citoyenService = new CitoyenService(citoyenRepository); // Fetch the Citoyen object
            
            citoyenService.removeCitoyen(emailUser);
            return new ResponseEntity<>("Citizen removed successfully", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error removing citizen: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error removing citizen");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Validate a citizen by their email address.
     *
     * @param emailUser The email address of the citizen to validate.
     * @return A success message if the validation is successful, or an error message.
     * @example POST /citoyen/validate_user/user@example.com
     * Response: HTTP 200 OK with a success message or HTTP 400 BAD REQUEST with an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate_user/{emailUser}")
    public ResponseEntity<?> validateCitoyen(@PathVariable String emailUser) {
        try {
            Optional<Citoyen> citoyen = citoyenRepository.findByMail(emailUser);
            if (citoyen.isEmpty()) {
                return new ResponseEntity<>("Citizen not found", HttpStatus.NOT_FOUND);
            }
            CitoyenService citoyenService = new CitoyenService(citoyenRepository); // Fetch the Citoyen object
           //Citoyen citoyen1 = citoyenService.findByEmail(emailUser); // Fetch the Citoyen object
            citoyenService.validateCitoyen(citoyen.get());
            return new ResponseEntity<>("Citizen validated successfully", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error validating citizen: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error validating citizen");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
        @CrossOrigin(origins = "http://localhost:3000")
        @GetMapping("/getcitoyen/{emailUser}")
        public ResponseEntity<?> getcitoyen(@PathVariable String emailUser) {
            try{
            Optional<Citoyen> citoyen = citoyenRepository.findByMail(emailUser);
            return new ResponseEntity<>(citoyen, HttpStatus.OK);
            }catch (Exception e) {
                System.err.println("Error getting citizen: " + e.getMessage());
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("message", "Error getting citizen");
                errorResponse.put("error", e.getMessage());
                return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
            }
        }
        
    /**
     * Update a citizen's details.
     *
     * @param emailUser The email address of the citizen to update.
     * @param name The new name of the citizen.
     * @param prenom The new first name of the citizen.
     * @param mail The new email address of the citizen.
     * @param numTel The new phone number of the citizen.
     * @param numSec The new social security number of the citizen.
     * @param role The new role of the citizen.
     * @param dateNaissance The new date of birth of the citizen.
     * @param sexe The new gender of the citizen.
     * @param validaton The new validation status of the citizen.
     * @param codePostal The new postal code of the citizen.
     * @param ville The new city of the citizen.
     * @param mdp The new password of the citizen.
     * @return A success message if the update is successful, or an error message.
     * @example POST /citoyen/update/user@example.com?name=John&prenom=Doe&mail=user@example.com&numTel=1234567890&numSec=123-45-6789&role=User&dateNaissance=2000-01-01&sexe=M&validaton=1&codePostal=12345&ville=SomeCity&mdp=newpassword
     * Response: HTTP 200 OK with a success message or HTTP 400 BAD REQUEST with an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/update/{emailUser}")
    public ResponseEntity<?> update(@PathVariable String emailUser, 
                                     @RequestParam String name, @RequestParam String prenom, 
                                     @RequestParam String mail, @RequestParam String numTel, 
                                     @RequestParam String numSec, @RequestParam String role, 
                                     @RequestParam Date dateNaissance, @RequestParam char sexe, 
                                     @RequestParam int validaton, @RequestParam String codePostal, 
                                     @RequestParam String ville, @RequestParam String mdp) {
        try {
            Optional<Citoyen> citoyen = citoyenRepository.findByMail(emailUser);
            if (citoyen.isEmpty()) {
                return new ResponseEntity<>("Citizen not found", HttpStatus.NOT_FOUND);
            }
            CitoyenService citoyenService = new CitoyenService(citoyenRepository);
            citoyenService.update(citoyen.get(), name, prenom, mail, numTel, numSec, role, dateNaissance, sexe, validaton, codePostal, ville, mdp);
            return new ResponseEntity<>("Citizen updated successfully", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error updating citizen: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error updating citizen");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
        }
    }
}