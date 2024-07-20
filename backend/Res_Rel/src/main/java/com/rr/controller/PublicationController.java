package com.rr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Publication;
import com.rr.services.PublicationService;
import com.rr.utils.JwtUtil;

@Controller
@RestController
@RequestMapping("/publications")
public class PublicationController {

    private final PublicationService publicationService;

    @Autowired
    public PublicationController(PublicationService publicationService) {
        this.publicationService = publicationService;
    }

    /**
     * Retrieves all publications.
     * 
     * @return A list of all publications or an error message.
     * @example GET /publications/list
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list")
    public ResponseEntity<?> getAllPublications() {
        try {
            List<Publication> publications = publicationService.getAllPublications();
            return ResponseEntity.ok(publications);
        } catch (Exception e) {
            System.err.println("Error retrieving publications: " + e.getMessage());
            return ResponseEntity.status(500).body("Error retrieving publications");
        }
    }

    /**
     * Deletes a publication.
     * 
     * @param token The authentication token of the user.
     * @param idPublication The ID of the publication to delete.
     * @return A response indicating the success or failure of the operation.
     * @example DELETE /publications/delete/{token}/{id}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{token}/{idPublication}")
    public ResponseEntity<?> deletePublication(@PathVariable String token, @PathVariable int idPublication) {
        try {
            // Extract the email from the token
            String emailUser = JwtUtil.getEmailFromToken(token);

            // Validate the token
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Delete the publication
            publicationService.deletePublication(idPublication);

            return ResponseEntity.ok().body("Publication deleted successfully");

        } catch (Exception e) {
            System.err.println("Error deleting publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error deleting publication");
        }
    }

    /**
     * Reports a publication.
     * 
     * @param idPublication The ID of the publication to report.
     * @return A response indicating the success of the operation.
     * @example POST /publications/report/{id}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/report/{idPublication}")
    public ResponseEntity<?> reportPublication(@PathVariable int idPublication) {
        try {
            publicationService.reportPublication(idPublication);
            return ResponseEntity.ok().body("Publication reported successfully");
        } catch (Exception e) {
            System.err.println("Error reporting publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error reporting publication");
        }
    }

    /**
     * Validates a publication.
     * 
     * @param idPublication The ID of the publication to validate.
     * @return A response indicating the success of the operation.
     * @example POST /publications/validate_publi/{idPublication}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate_publi/{idPublication}")
    public ResponseEntity<?> validatePublication(@PathVariable int idPublication) {
        try {
            publicationService.validatePublication(idPublication);
            return ResponseEntity.ok().body("Publication validated successfully");
        } catch (Exception e) {
            System.err.println("Error validating publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error validating publication");
        }
    }

    /**
     * Publishes a publication.
     * 
     * @param idPublication The ID of the publication to publish.
     * @return A response indicating the success of the operation.
     * @example POST /publications/publish/{idPublication}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/publish/{idPublication}")
    public ResponseEntity<?> publishPublication(@PathVariable Integer idPublication) {
        try {
            publicationService.publishPublication(idPublication);
            return ResponseEntity.ok().body("Publication published successfully");
        } catch (Exception e) {
            System.err.println("Error publishing publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error publishing publication");
        }
    }

    /*
     * 
     * @GetMapping("/api/publications/{email}")
     * public ResponseEntity<List<Publication>> getPublicationsByCitoyenEmail(@PathVariable String email) {
     *     try {
     *         Citoyen citoyen = citoyenService.findbymail(email);
     *         if (citoyen == null) {
     *             return ResponseEntity.notFound().build();
     *         }
     *         List<Publication> publications = publicationService.getPublicationsByCitoyen(citoyen);
     *         return ResponseEntity.ok(publications);
     *     } catch (Exception e) {
     *         System.err.println("Error retrieving publications by email: " + e.getMessage());
     *         return ResponseEntity.status(500).body("Error retrieving publications by email");
     *     }
     * }
     */
}