package com.rr.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rr.entity.Commentaire;
import com.rr.repository.CommentaireRepository;

@Service
public class CommentaireService {

    private CommentaireRepository commentaireRepository;

    public CommentaireService(CommentaireRepository commentaireRepository) {
        this.commentaireRepository = commentaireRepository;
    }

    /**
     * Finds all commentaires based on the signale status.
     * 
     * @param commentaireSignale the signale status to filter by
     * @return a list of commentaires with the specified signale status
     */
    public List<Commentaire> findAllByCommentaireSignale(boolean commentaireSignale) {
        return commentaireRepository.findAllByCommentaireSignale(commentaireSignale);
    }

    /**
     * Adds a new commentaire to the database.
     * 
     * @param idCommentaire   the ID of the commentaire to add
     * @param tewtCommentaire the content of the commentaire
     * @param type            the type of the commentaire (true for a report, false
     *                        for a comment)
     * @throws IllegalArgumentException if the input is invalid
     */
    public void addCommentaire(int idCommentaire, String tewtCommentaire, Boolean type) {
        // Check that the input is valid
        if (idCommentaire < 0) {
            throw new IllegalArgumentException("idPublication must be positive");
        }
        if (tewtCommentaire == null || tewtCommentaire.isEmpty()) {
            throw new IllegalArgumentException("tewtCommentaire cannot be null or empty");
        }

        // Create a new commentaire object
        Commentaire commentaire = new Commentaire();
        commentaire.setTewtCommentaire(tewtCommentaire);
        commentaire.setIdCommentaire(idCommentaire);
        commentaire.setType(type);

        // Save the commentaire to the database
        commentaireRepository.save(commentaire);
    }

    /**
     * Finds all commentaires associated with the given publication ID.
     * 
     * @param idPublication the ID of the publication to find commentaires for
     * @return a list of commentaires associated with the given publication ID
     */
    public List<Commentaire> findByPublicationIdPublication(int idPublication) {
        return commentaireRepository.findByPublicationIdPublication(idPublication);
    }

    /**
     * Finds all commentaires based on the type field.
     *
     * @param type the value of the type field to filter by
     * @return a list of commentaires that match the specified type value
     */
    public List<Commentaire> findByType(Boolean type) {
        // Call the findByType method of the CommentaireRepository to retrieve
        // commentaires based on the type field
        return commentaireRepository.findByType(type);
    }

    /**
     * Retrieves all comments based on the type and commentaireSignale fields.
     *
     * @param type               The value of the type field to filter by.
     * @param commentaireSignale The value of the commentaireSignale field to filter
     *                           by.
     * @return A list of comments that match the specified type and signal values.
     */
    public List<Commentaire> findByTypeAndCommentaireSignale(Boolean type, Boolean commentaireSignale) {
        // Call the findByTypeAndCommentaireSignale method of the CommentaireRepository
        // to retrieve commentaires based on the type and commentaireSignale fields
        return commentaireRepository.findByTypeAndCommentaireSignale(type, commentaireSignale);
    }

    /**
     * Signals a commentaire by setting its commentaireSignale field to true and
     * saving it to the database.
     *
     * @param commentaire   The commentaire to signal.
     * @param idCommentaire The ID of the commentaire to signal.
     */
    public void signaleCommentaire(Commentaire commentaire, int idCommentaire) {
        // Set the commentaireSignale field to true
        commentaire.setCommentaireSignale(true);

        // Save the updated commentaire to the database
        commentaireRepository.save(commentaire);
    }
}