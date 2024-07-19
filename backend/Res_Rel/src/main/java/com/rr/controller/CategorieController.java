package com.rr.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;
import com.rr.services.CategorieService;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;
import java.util.Map;
import java.util.HashMap;


@RestController
@RequestMapping("/categories")

public class CategorieController {

    private final CategorieRepository categorieRepository;
    
    public CategorieController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    @GetMapping("/list")
    public ResponseEntity<?> getAllCategorie() {
        try {
            List<Categorie> categories = categorieRepository.findAll();
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error retrieving categories: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error retrieving categories");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/findbyid")
    public Optional<Categorie> findByCategorie(int idCategorie) {
        return findByCategorie(idCategorie);
    }

    @GetMapping("/findbylibelle")
    public Optional<Categorie> findByLibelle(String libelle) {
        return findByLibelle(libelle);
    }

    @PutMapping("/addCategorie")
    public void addCategorie(@RequestParam int idCategorie, @RequestParam String libelle, @RequestParam boolean actif) {
        CategorieService categorieService = new CategorieService(categorieRepository); // create an instance of CategorieService
        categorieService.addCategorie(idCategorie, libelle, actif); // call the addCategorie method on the instance
        System.out.println("Categorie ajouté");
    }

    @GetMapping("/findByActif/@PathVariable{actif}")
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