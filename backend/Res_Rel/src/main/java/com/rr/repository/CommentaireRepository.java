package com.rr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.rr.entity.Commentaire;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {

    @Modifying
    @Query("UPDATE Commentaire c SET c.commentaireSignale = :commentaireSignale WHERE c.idCommentaire = :idCommentaire")
    void signaleCommentaire(Commentaire commentaire, int idCommentaire);
    
    List<Commentaire> findAllByCommentaireSignale(Boolean commentaireSignale);

    List<Commentaire> findByPublicationIdPublication(int idPublication);

    List<Commentaire> findByType(Boolean type);

    List<Commentaire> findByTypeAndCommentaireSignale(Boolean type, Boolean commentaireSignale);

    // List<Commentaire> findByCitoyenAndSignal(int idCitoyen, Boolean commentaireSignale);
}
