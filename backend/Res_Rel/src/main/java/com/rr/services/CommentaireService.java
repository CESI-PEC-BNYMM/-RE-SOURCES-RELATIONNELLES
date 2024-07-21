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

    public List<Commentaire> findAllByCommentaireSignale(boolean commentaireSignale) {
        return commentaireRepository.findAllByCommentaireSignale(commentaireSignale);
    }

    public void addCommentaire(int idCommentaire, String tewtCommentaire, Boolean type) {
        if (idCommentaire < 0) {
            throw new IllegalArgumentException("idPublication must be positive");
        }
        if (tewtCommentaire == null || tewtCommentaire.isEmpty()) {
            throw new IllegalArgumentException("tewtCommentaire cannot be null or empty");
        }

        Commentaire commentaire = new Commentaire();
        commentaire.setTewtCommentaire(tewtCommentaire);
        commentaire.setIdCommentaire(idCommentaire);
        commentaire.setType(type);
        commentaireRepository.save(commentaire);
    }

    public List<Commentaire> findByPublicationIdPublication(int idPublication) {
        return commentaireRepository.findByPublicationIdPublication(idPublication);
    }

    public List<Commentaire> findByType(Boolean type) {
        return commentaireRepository.findByType(type);
    }

    public List<Commentaire> findByTypeAndCommentaireSignale(Boolean type, Boolean commentaireSignale) {
        return commentaireRepository.findByTypeAndCommentaireSignale(type, commentaireSignale);
    }

    // public List<Commentaire> findByCitoyenAndSignal(Citoyen citoyen, Boolean commentaireSignale) {
    //     return commentaireRepository.findByCitoyenAndSignal(citoyen, signal);
    // }


    public void signaleCommentaire(Commentaire commentaire, int idCommentaire) {
        commentaire.setCommentaireSignale(true);
        commentaireRepository.save(commentaire);
        // commentaireRepository.signaleCommentaire(commentaire, idCommentaire);
    }
}