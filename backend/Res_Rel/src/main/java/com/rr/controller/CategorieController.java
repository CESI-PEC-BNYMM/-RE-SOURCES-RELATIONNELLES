package com.rr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;
import com.rr.services.CategorieService;


@RestController
@RequestMapping("/api")

public class CategorieController {

    private final CategorieRepository categorieRepository;
    
    public CategorieController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @GetMapping("/categories/list")
    public List<Categorie> getAllCategorie() {
        return categorieRepository.findAll();
    }

    @GetMapping("/categories/findbyid")
    public Optional<Categorie> findByCategorie(int idCategorie) {
        return findByCategorie(idCategorie);
    }

    @GetMapping("/categories/findbylibelle")
    public Optional<Categorie> findByLibelle(String libelle) {
        return findByLibelle(libelle);
    }

    @PutMapping("/categories/addCategorie")
    public void addCategorie(@RequestParam int idCategorie, @RequestParam String libelle, @RequestParam boolean actif) {
        CategorieService categorieService = new CategorieService(categorieRepository); // create an instance of CategorieService
        categorieService.addCategorie(idCategorie, libelle, actif); // call the addCategorie method on the instance
        System.out.println("Categorie ajouté");
    }

    @GetMapping("/categories/findByActif/@PathVariable{actif}")
    public Optional<Categorie> findByActif(boolean actif) {
        if (actif == true) {
            return categorieRepository.findByActif(true);
        } else if (actif == false) {
            return categorieRepository.findByActif(false);
        } else {
            return Optional.empty();
        }
    }
    
}
