package com.rr.controller;

import java.util.stream.Collectors;

import org.hibernate.mapping.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.ResourceNotFoundException;
import com.rr.dto.DemandeAmiDTO;
import com.rr.entity.DemandeAmi;
import com.rr.repository.DemandeAmiRepository;
import com.rr.services.DemandeAmiService;
import com.rr.utils.JwtUtil;

@RestController
@RequestMapping("/demandeAmi")
public class DemandeAmiController {

    private final DemandeAmiRepository demandeAmiRepository;
    private final DemandeAmiService demandeAmiService;

    public DemandeAmiController(DemandeAmiRepository demandeAmiRepository, DemandeAmiService demandeAmiService) {
        this.demandeAmiRepository = demandeAmiRepository;
        this.demandeAmiService = demandeAmiService;
    }

    /**
     * Retrieves a list of friend requests for a user.
     * 
     * @param token The authentication token of the user.
     * @return A list of friend requests or an error message.
     * @example GET /demandeAmi/list/
     * @header { "Authorization": "Bearer token" }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/")
    public ResponseEntity<?> listDemandeAmi(@RequestHeader("Authorization") String token) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);

            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Find all friend requests for the user
            java.util.List<DemandeAmi> demandes = demandeAmiRepository.findByCitoyenreceveurMail(emailUser);

            // Convert DemandeAmi entities to DemandeAmiDTOs
            java.util.List<DemandeAmiDTO> demandeAmiDTOs = demandes.stream()
                    .map(demande -> new DemandeAmiDTO(
                            demande.getIdDemandeAmi(),
                            demande.getDemandeValidee(),
                            demande.getCitoyen().getNom(),
                            demande.getCitoyen().getPrenom()))
                    .collect(Collectors.toList());

            return ResponseEntity.ok().body(demandeAmiDTOs);

        } catch (Exception e) {
            System.err.println("Error retrieving friend requests: " + e.getMessage());
            return ResponseEntity.status(500).body("Error retrieving friend requests: " + e.getMessage());
        }
    }

    /**
     * Accepts a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to accept.
     * @return A response indicating the success or failure of the operation.
     * @example POST /demandeAmi/accept_friend/{idDemandeAmi}
     * @header { "Authorization": "Bearer token" }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/accept_friend/{idDemandeAmi}")
    public ResponseEntity<?> accepterDemandeAmi(@RequestHeader("Authorization") String token, @PathVariable int idDemandeAmi) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);

            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Find the friend request by ID
            DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                    .orElseThrow(() -> new ResourceNotFoundException("Friend request not found"));

            // Check if the request was made to the correct user
            if (!demande.getCitoyenreceveur().getMail().equals(emailUser)) {
                return ResponseEntity.badRequest().body("Not authorized to accept this request");
            }

            // Accept the friend request
            demande.setDemandeValidee(true);
            demandeAmiRepository.save(demande);

            return ResponseEntity.ok().body("Friend request accepted");

        } catch (Exception e) {
            System.err.println("Error accepting friend request: " + e.getMessage());
            return ResponseEntity.status(500).body("Error accepting friend request" + e.getMessage());
        }
    }

    /**
     * Confirms a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to confirm.
     * @return A response indicating the success or failure of the operation.
     * @example PUT /demandeAmi/confirm_demande/{idDemandeAmi}
     * @header { "Authorization": "Bearer token" }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/confirm_demande/{idDemandeAmi}")
    public ResponseEntity<?> confirmerDemandeAmi(@RequestHeader("Authorization") String token, @PathVariable int idDemandeAmi) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);

            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Find the friend request by ID
            DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                    .orElseThrow(() -> new ResourceNotFoundException("Friend request not found"));

            // Check if the request was made by the correct user
            if (!demande.getCitoyen().getMail().equals(emailUser)) {
                return ResponseEntity.badRequest().body("Not authorized to confirm this request");
            }

            // Confirm the friend request
            demande.setDemandeValidee(true);
            demandeAmiRepository.save(demande);

            return ResponseEntity.ok().body("Friend request confirmed");

        } catch (Exception e) {
            System.err.println("Error confirming friend request: " + e.getMessage());
            return ResponseEntity.status(500).body("Error confirming friend request" + e.getMessage());
        }
    }

    /**
     * Refuses a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to refuse.
     * @return A response indicating the success or failure of the operation.
     * @example DELETE /demandeAmi/refuse_friend/{idDemandeAmi}
     * @header { "Authorization": "Bearer token" }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/refuse_friend/{idDemandeAmi}")
    public ResponseEntity<?> refuserDemandeAmi(@RequestHeader("Authorization") String token, @PathVariable int idDemandeAmi) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);
    
            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }
    
            // Find the friend request by ID
            DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                    .orElseThrow(() -> new ResourceNotFoundException("Friend request not found"));
    
            // Check if the request was made by the correct user
            if (!demande.getCitoyen().getMail().equals(emailUser)) {
                return ResponseEntity.badRequest().body("Not authorized to refuse this request");
            }
    
            // Refuse the friend request
            demandeAmiRepository.delete(demande);
    
            return ResponseEntity.ok().body("Friend request refused");
    
        } catch (Exception e) {
            System.err.println("Error refusing friend request: " + e.getMessage());
            return ResponseEntity.status(500).body("Error refusing friend request: " + e.getMessage());
        }
    }

    /**
     * Deletes a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to delete.
     * @return A response indicating the success or failure of the operation.
     * @example DELETE /demandeAmi/delete/{idDemandeAmi}
     * @header { "Authorization": "Bearer token" }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{idDemandeAmi}")
    public ResponseEntity<?> supprimerDemandeAmi(@RequestHeader("Authorization") String token, @PathVariable int idDemandeAmi) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);
    
            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }
    
            // Find the friend request by ID
            DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                    .orElseThrow(() -> new ResourceNotFoundException("Friend request not found"));
    
            // Check if the request was made by the correct user
            if (!demande.getCitoyen().getMail().equals(emailUser)) {
                return ResponseEntity.badRequest().body("Not authorized to delete this request");
            }
    
            // Delete the friend request
            demandeAmiRepository.delete(demande);
    
            return ResponseEntity.ok().body("Friend request deleted");
    
        } catch (Exception e) {
            System.err.println("Error deleting friend request: " + e.getMessage());
            return ResponseEntity.status(500).body("Error deleting friend request: " + e.getMessage());
        }
    }
}