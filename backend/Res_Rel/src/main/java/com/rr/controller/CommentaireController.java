package com.rr.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Commentaire;
import com.rr.repository.CommentaireRepository;
import com.rr.services.CommentaireService;

@RestController
@RequestMapping("/commentaires")
public class CommentaireController {

    private final CommentaireRepository commentaireRepository;
    private final CommentaireService commentaireService;

    public CommentaireController(CommentaireRepository commentaireRepository, CommentaireService commentaireService) {
        this.commentaireRepository = commentaireRepository;
        this.commentaireService = commentaireService;
    }

    /**
     * Signals a comment by updating the commentaireSignale field and saving the comment in the repository.
     *
     * @param idCommentaire The id of the comment to be signaled.
     * @param commentaire The comment object with updated signal status.
     * @return HTTP response indicating the success or failure of the operation.
     * @example PUT /commentaires/signale/1
     * Request Body: { "commentaireSignale": true }
     * Response: HTTP 200 OK with success message or HTTP 500 INTERNAL SERVER ERROR with error message.
     */
    

     @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/addCommentaire")
    public ResponseEntity<?> addCommentaire(@RequestParam int idCommentaire, @RequestParam String tewtCommentaire, Boolean type) {
        try {
            CommentaireService commentaireService = new CommentaireService(commentaireRepository);
            commentaireService.addCommentaire(idCommentaire, tewtCommentaire, type);
            return new ResponseEntity<>("Commentaire add successfully", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error adding commentaire: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error adding commentaire");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/signale/{idCommentaire}")
    public ResponseEntity<?> signaleCommentaire(@PathVariable int idCommentaire, @RequestParam boolean commentaireSignale) {
        try {
            Commentaire commentaire = commentaireRepository.findById(idCommentaire).orElseThrow();
            commentaire.setCommentaireSignale(commentaireSignale);
            commentaireRepository.save(commentaire);
            return new ResponseEntity<>("Commentaire signaled successfully", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error signaling commentaire: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error signaling commentaire");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all comments based on the commentaireSignale field.
     *
     * @param commentaireSignale The value of the commentaireSignale field to filter by.
     * @return A list of comments that match the specified signal value.
     * @example GET /commentaires/signale?commentaireSignale=true
     * Response: HTTP 200 OK with a list of comments or HTTP 500 INTERNAL SERVER ERROR with error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/signale")
    public ResponseEntity<?> findAllByCommentaireSignale(@RequestParam Boolean commentaireSignale) {
        try {
            List<Commentaire> commentaires = commentaireService.findAllByCommentaireSignale(commentaireSignale);
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error retrieving commentaires by signal: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving commentaires by signal");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all comments based on the type field.
     *
     * @param type The value of the type field to filter by.
     * @return A list of comments that match the specified type value.
     * @example GET /commentaires/type?type=1
     * Response: HTTP 200 OK with a list of comments or HTTP 500 INTERNAL SERVER ERROR with error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/type")
    public ResponseEntity<?> findByType(@RequestParam Boolean type) {
        try {
            List<Commentaire> commentaires = commentaireService.findByType(type);
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error retrieving commentaires by type: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving commentaires by type");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all comments based on the type and commentaireSignale fields.
     *
     * @param type   The value of the type field to filter by.
     * @param commentaireSignale The value of the commentaireSignale field to filter by.
     * @return A list of comments that match the specified type and signal values.
     * @example GET /commentaires/type/1/signale?commentaireSignale=true
     * Response: HTTP 200 OK with a list of comments or HTTP 500 INTERNAL SERVER ERROR with error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/type/{type}/signale/{commentaireSignale}")
    public ResponseEntity<?> findByTypeAndSignal(@PathVariable Boolean type, @PathVariable Boolean commentaireSignale) {
        try {
            List<Commentaire> commentaires = commentaireService.findByTypeAndCommentaireSignale(type, commentaireSignale);
            return new ResponseEntity<>(commentaires, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error retrieving commentaires by type and signal: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving commentaires by type and signal");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves all comments based on the citoyen field and the signal field.
     *
     * @param idCitoyen The value of the citoyen field to filter by.
     * @param commentaireSignale The value of the signal field to filter by.
     * @return A list of comments that match the specified citoyen and signal values.
     * @example GET /commentaires/citoyen/{idCitoyen}/signale?commentaireSignale=true
     * Response: HTTP 200 OK with a list of comments or HTTP 500 INTERNAL SERVER ERROR with error message.
     */
    // @CrossOrigin(origins = "http://localhost:3000")
    // @GetMapping("/citoyen/{idCitoyen}/signale")
    // public ResponseEntity<?> findByCitoyenAndSignal(@PathVariable int idCitoyen, @RequestParam Boolean commentaireSignale) {
    //     try {
    //         List<Commentaire> commentaires = commentaireService.findByCitoyenAndSignal(idCitoyen, signal);
    //         return new ResponseEntity<>(commentaires, HttpStatus.OK);
    //     } catch (Exception e) {
    //         System.err.println("Error retrieving commentaires by citoyen and signal: " + e.getMessage());
    //         Map<String, String> errorResponse = new HashMap<>();
    //         errorResponse.put("message", "Error retrieving commentaires by citoyen and signal");
    //         errorResponse.put("error", e.getMessage());
    //         return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
    //     }
    // }
}