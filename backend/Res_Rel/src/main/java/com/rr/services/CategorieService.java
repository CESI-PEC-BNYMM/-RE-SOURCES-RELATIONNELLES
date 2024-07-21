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
     * @param libelle     Name of the category
     * @param actif       Whether the category is active
     * @throws IllegalArgumentException if the ID is negative, or if the name is
     *                                  null or empty
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

    /**
     * Find a category by its ID.
     *
     * @param idCategorie ID of the category.
     * @return The category if found, otherwise throws a RuntimeException.
     * @throws RuntimeException if no category exists with the given ID.
     */
    public Optional<Categorie> findByIdCategorie(int idCategorie) {
        // Use the categorieRepository to find the category by ID
        // If the category is found, return it as an Optional
        // If the category is not found, throw a RuntimeException
        return Optional.ofNullable(categorieRepository.findByIdCategorie(idCategorie))
                .orElseThrow(() -> new RuntimeException("Aucune Categorie n'existe avec cet id"));
    }

    /**
     * Find a category by its libelle (name).
     *
     * @param libelle Name of the category.
     * @return The category if found, otherwise throws a RuntimeException.
     * @throws RuntimeException if no category exists with the given libelle.
     */
    public Optional<Categorie> findByLibelle(String libelle) {
        // Use the categorieRepository to find the category by libelle
        // If the category is found, return it as an Optional
        // If the category is not found, throw a RuntimeException
        return Optional.ofNullable(categorieRepository.findByLibelle(libelle))
                .orElseThrow(() -> new RuntimeException("No category exists with this libelle"));
    }

    /**
     * Find categories by their actif status.
     *
     * @param actif The actif status (true or false).
     * @return The categories with the specified actif status.
     * @throws RuntimeException if no category exists with the given actif status.
     */
    public List<Categorie> findByActif(boolean actif) {
        // Check if the actif status is true
        if (actif == true) {
            // Return categories with actif status of true
            return categorieRepository.findByActif(true);
        }
        // Check if the actif status is false
        else if (actif == false) {
            // Return categories with actif status of false
            return categorieRepository.findByActif(false);
        }
        // Throw a RuntimeException if the actif status is neither true nor false
        else {
            throw new RuntimeException("Aucune Categorie n'existe avec cet etat");
        }
    }

}
