package com.rr.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.rr.entity.Commentaire;
import com.rr.repository.CommentaireRepository;
import com.rr.entity.Citoyen;

@Service
public class CommentaireService {
    
    private CommentaireRepository commentaireRepository;

    public CommentaireService(CommentaireRepository commentaireRepository) {
        this.commentaireRepository = commentaireRepository;
    }

    public List<Commentaire> findAllByCommentaireSignale(boolean commentaireSignale) {
        return commentaireRepository.findAllByCommentaireSignale(commentaireSignale);
    }

    public List<Commentaire> findByPublicationIdPublication(int idPublication) {
        return commentaireRepository.findByPublicationIdPublication(idPublication);
    }

    public List<Commentaire> findByType(Boolean type) {
        return commentaireRepository.findByType(type);
    }

    public List<Commentaire> findByTypeAndSignal(Boolean type, Boolean signal) {
        return commentaireRepository.findByTypeAndSignal(type, signal);
    }

    // public List<Commentaire> findByCitoyenAndSignal(Citoyen citoyen, Boolean signal) {
    //     return commentaireRepository.findByCitoyenAndSignal(citoyen, signal);
    // }


    public void signaleCommentaire(Commentaire commentaire, int idCommentaire) {
        commentaire.setCommentaireSignale(true);
        commentaireRepository.save(commentaire);
        // commentaireRepository.signaleCommentaire(commentaire, idCommentaire);
    }
}