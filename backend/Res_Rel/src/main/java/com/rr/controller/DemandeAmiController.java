package com.rr.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.ResourceNotFoundException;
import com.rr.entity.DemandeAmi;
import com.rr.repository.DemandeAmiRepository;
import com.rr.services.DemandeAmiService;
import com.rr.utils.JwtUtil;

@RestController
@RequestMapping("/api")

public class DemandeAmiController {

    private DemandeAmiService demandeAmiService;

    private DemandeAmiController(DemandeAmiRepository demandeAmiRepository) {
        this.demandeAmiRepository = demandeAmiRepository;
    }

    /**
     * Retrieves a list of friend requests for a user.
     * 
     * @param token The authentication token of the user.
     * @return A string representation of the list of friend requests.
     */
    @GetMapping("/api/demandeAmi/list/{token}")
    public String listDemandeAmi(@PathVariable String token) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);
        
        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return an empty string
            return new String();
        }
        
        // The function is not implemented yet, so it returns an empty string
        return new String();
    }

    /**
     * Accepts a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to accept.
     * @return A response indicating the success of the operation.
     */
    @PostMapping("/api/demande_ami/accept_friend/{token}/{idDemandeAmi}")
    public ResponseEntity<Void> accepterDemandeAmi(@PathVariable String token, @PathVariable int idDemandeAmi) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);

        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Find the friend request by ID
        DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                .orElseThrow(() -> new ResourceNotFoundException("Answer Not Found"));

        // Check if the request was made to the correct user
        if (!demande.getCitoyenreceveur().getMail().equals(emailUser)) {
            // If not, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Accept the friend request
        demande.setDemandeValidee(true);
        demandeAmiRepository.save(demande);

        // Return a success response
        return ResponseEntity.ok().build();
    }

    /**
     * Confirms a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to confirm.
     * @return A response indicating the success of the operation.
     */
    @PutMapping("/api/demande_ami/confirm_demande/{token}/{idDemandeAmi}")
    public ResponseEntity<Void> confirmerDemandeAmi(@PathVariable String token, @PathVariable int idDemandeAmi) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);

        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Find the friend request by ID
        DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                .orElseThrow(() -> new ResourceNotFoundException("Answer Not Found"));

        // Check if the request was made by the correct user
        if (!demande.getCitoyen().getMail().equals(emailUser)) {
            // If not, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Confirm the friend request
        demande.setDemandeValidee(true);
        demandeAmiRepository.save(demande);

        // Return a success response
        return ResponseEntity.ok().build();
    }

    /**
     * Refuses a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to refuse.
     * @return A response indicating the success of the operation.
     */
    @DeleteMapping("/api/demande_ami/refuse_friend/{token}/{idDemandeAmi}")
    public ResponseEntity<Void> refuserDemandeAmi(@PathVariable String token, @PathVariable int idDemandeAmi) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);

        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Find the friend request by ID
        DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                .orElseThrow(() -> new ResourceNotFoundException("Answer Not Found"));

        // Check if the request was made to the correct user
        if (!demande.getCitoyenreceveur().getMail().equals(emailUser)) {
            // If not, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Refuse the friend request
        demandeAmiRepository.delete(demande);

        // Return a success response
        return ResponseEntity.ok().build();
    }

    /**
     * Deletes a friend request for a user.
     *
     * @param token The authentication token of the user.
     * @param idDemandeAmi The ID of the friend request to delete.
     * @return A response indicating the success of the operation.
     */
    @DeleteMapping("/api/demande_ami/delete/{token}/{idDemandeAmi}")
    public ResponseEntity<Void> deleteDemandeAmi(@PathVariable String token, @PathVariable int idDemandeAmi) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);

        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Find the friend request by ID
        DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
                .orElseThrow(() -> new ResourceNotFoundException("Answer Not Found"));

        // Check if the request was made by the correct user
        if (!demande.getCitoyen().getMail().equals(emailUser)) {
            // If not, return a bad request response
            return ResponseEntity.badRequest().build();
        }

        // Delete the friend request
        demandeAmiRepository.delete(demande);

        // Return a success response
        return ResponseEntity.ok().build();
    }

    private DemandeAmiRepository demandeAmiRepository;

}


