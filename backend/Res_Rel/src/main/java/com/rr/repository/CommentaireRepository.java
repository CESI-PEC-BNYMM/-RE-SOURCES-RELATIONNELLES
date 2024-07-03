package com.rr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rr.entity.Commentaire;

public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {

    void signaleCommentaire(Commentaire commentaire, int idCommentaire);
    
    List<Commentaire> findAllByCommentaireSignale(Boolean commentaireSignale);

    List<Commentaire> findByPublicationIdPublication(int idPublication);

    List<Commentaire> findByType(Boolean type);

    List<Commentaire> findByTypeAndSignal(Boolean type, Boolean signal);

    List<Commentaire> findByCitoyenAndSignal(int idCitoyen, Boolean signal);
}
