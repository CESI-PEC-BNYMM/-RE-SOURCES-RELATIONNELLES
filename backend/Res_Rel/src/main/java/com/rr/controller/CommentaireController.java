package com.rr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rr.entity.Commentaire;
import com.rr.repository.CommentaireRepository;
import com.rr.services.CommentaireService;

@RequestMapping("/api")
public class CommentaireController {

        private CommentaireRepository commentaireRepository;

        private CommentaireService commentaireService;

        public CommentaireController(CommentaireRepository commentaireRepository, CommentaireService commentaireService) {
            this.commentaireRepository = commentaireRepository;
            this.commentaireService = commentaireService;
        }
        
        /**
         * Signals a comment by updating the commentaireSignale field and saving the comment in the repository.
         *
         * @param commentaire     The comment to be signaled
         * @param idCommentaire   The id of the comment
         */
        @PutMapping("/api/commentaires/signale/{idCommentaire}")
        public void signaleCommentaire(Commentaire commentaire, @PathVariable int idCommentaire) {
            // Find the comment by id and get the original commentaireSignale value
            boolean originalSignale = commentaireRepository.findById(idCommentaire).get().isCommentaireSignale();
            // Set the comment as signaled
            commentaire.setCommentaireSignale(!originalSignale);
            // Save the comment
            commentaireRepository.save(commentaire);
            // Signal the comment in the repository
            commentaireRepository.signaleCommentaire(commentaire, idCommentaire);
        }
        
        /**
         * Retrieves all comments based on the commentaireSignale field.
         *
         * @param signal The value of the commentaireSignale field to filter by.
         * @return A list of comments that match the specified signal value.
         */
        @GetMapping("/api/commentaires/signale")
        public void findAllByCommentaireSignale(@PathVariable Boolean signal) {
            // Call the service method to retrieve all comments based on the commentaireSignale field
            commentaireService.findAllByCommentaireSignale(signal);
        }

        /**
         * Retrieves all comments based on the type field.
         *
         * @param type The value of the type field to filter by.
         * @return A list of comments that match the specified type value.
         */
        @GetMapping("/api/commentaires/{type}")
        public void findByType(@PathVariable Boolean type) {
            // Call the service method to retrieve all comments based on the type field
            commentaireService.findByType(type);
        }

        /**
         * Retrieves all comments based on the type and commentaireSignale fields.
         *
         * @param type   The value of the type field to filter by.
         * @param signal The value of the commentaireSignale field to filter by.
         * @return A list of comments that match the specified type and signal values.
         */
        @GetMapping("/api/commentaires/{type}/{signal}")
        public void findByTypeAndSignal(@PathVariable Boolean type, @PathVariable Boolean signal) {
            // Call the service method to retrieve all comments based on the type and commentaireSignale fields
            commentaireService.findByTypeAndSignal(type, signal);
        }

        /**
         * Retrieves all comments based on the citoyen field and the signal field.
         *
         * @param idCitoyen The value of the citoyen field to filter by.
         * @param signal The value of the signal field to filter by.
         * @return A list of comments that match the specified citoyen and signal values.
         */
        @GetMapping("/api/commentaires/{idCitoyen}")
        public List<Commentaire> findByCitoyenAndSignal(@PathVariable int idCitoyen, @PathVariable Boolean signal) {
            // Call the service method to retrieve all comments based on the citoyen and signal fields
            return commentaireService.findByCitoyenAndSignal(idCitoyen, signal);
        }


    }