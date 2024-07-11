package com.rr.services;

import java.util.Optional;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;

public class CategorieService {

    private CategorieRepository categorieRepository;

    public CategorieService(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    public void addCategorie(int idCategorie, String libelle, boolean actif) {
        Categorie categorie = new Categorie();
        categorie.setIdCategorie(idCategorie);
        categorie.setLibelle(libelle);
        categorie.setActif(actif);
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

    public Optional<Categorie> filterByActif(boolean actif) {
        if (actif == true) {
            return categorieRepository.findByActif(actif);
        } else if (actif == false) {
            return categorieRepository.findByActif(actif);
        } else {
            return Optional.empty();
        }
    }

}
