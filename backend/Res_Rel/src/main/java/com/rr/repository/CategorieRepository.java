package com.rr.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.Categorie;
@Repository
public interface CategorieRepository extends JpaRepository<Categorie, Integer> {
    
    Optional<Categorie> findByIdCategorie(int idCategorie);

    Optional<Categorie> findByLibelle(String libelle);

    List<Categorie> findByActif(boolean actif);

}