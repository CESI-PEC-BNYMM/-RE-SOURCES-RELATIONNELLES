package com.rr.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;

@Service
public class CategorieService {

    private CategorieRepository categorieRepository;

    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    /**
     * Add a new category.
     *
     * @param idCategorie ID of the category
     * @param libelle Name of the category
     * @param actif Whether the category is active
     * @throws IllegalArgumentException if the ID is negative, or if the name is null or empty
     */
    public void addCategorie(int idCategorie, String libelle, boolean actif) {
        // If id is negative, throw an exception
        if (idCategorie < 0) {
            throw new IllegalArgumentException("ID must be a positive integer");
        }

        // If libelle is null or empty, throw an exception
        if (libelle == null || libelle.isEmpty()) {
            throw new IllegalArgumentException("Libelle cannot be null or empty");
        }

        // Create the new category
        Categorie categorie = new Categorie();
        categorie.setIdCategorie(idCategorie);
        categorie.setLibelle(libelle);
        categorie.setActif(actif);

        // Save the new category to the database
        categorieRepository.save(categorie);
    }


    public Optional<Categorie> findByIdCategorie(int idCategorie) {
        return Optional.ofNullable(categorieRepository.findByIdCategorie(idCategorie))
        .orElseThrow(() -> new RuntimeException("Aucune Categorie n'existe avec cet id"));
    }

    public Optional<Categorie> findByLibelle(String libelle) {
        return Optional.ofNullable(categorieRepository.findByLibelle(libelle))
        .orElseThrow(() -> new RuntimeException("Aucune Categorie n'existe avec ce libelle"));
    }

    public List<Categorie> findByActif(boolean actif) {
        if (actif == true) {
            return categorieRepository.findByActif(true);
        } else if (actif == false) {
            return categorieRepository.findByActif(false);
        } else {
            throw new RuntimeException("Aucune Categorie n'existe avec cet etat");
        }
    }

}
