package com.rr.controller;

import java.util.List;
import java.util.Optional;
import java.util.Map;
import java.util.HashMap;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;
import com.rr.services.CategorieService;

import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/categories")
public class CategorieController {

    private final CategorieRepository categorieRepository;

    @Autowired
    public CategorieController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    /**
     * Retrieve all categories.
     *
     * @return List of all categories in a ResponseEntity.
     * @example GET /categories/list
     * Response: HTTP 200 OK
     * [
     *   { "idCategorie": 1, "libelle": "Books", "actif": true },
     *   { "idCategorie": 2, "libelle": "Electronics", "actif": false }
     * ]
     */
    @CrossOrigin(origins = "http://localhost:3000")
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

    /**
     * Find a category by its ID.
     *
     * @param idCategorie ID of the category.
     * @return The category if found, otherwise an error message.
     * @example GET /categories/findbyid?idCategorie=1
     * Response: HTTP 200 OK
     * { "idCategorie": 1, "libelle": "Books", "actif": true }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findbyid")
    public ResponseEntity<?> findByCategorie(@RequestParam int idCategorie) {
        try {
            Optional<Categorie> categorie = categorieRepository.findById(idCategorie);
            return new ResponseEntity<>(categorie, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error finding category by ID: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error finding category by ID");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Find a category by its libelle (name).
     *
     * @param libelle Name of the category.
     * @return The category if found, otherwise an error message.
     * @example GET /categories/findbylibelle?libelle=Books
     * Response: HTTP 200 OK
     * { "idCategorie": 1, "libelle": "Books", "actif": true }
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findbylibelle")
    public ResponseEntity<?> findByLibelle(@RequestParam String libelle) {
        try {
            Optional<Categorie> categorie = categorieRepository.findByLibelle(libelle);
            return new ResponseEntity<>(categorie, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error finding category by libelle: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error finding category by libelle");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Add a new category.
     *
     * @param idCategorie ID of the category.
     * @param libelle Name of the category.
     * @param actif Whether the category is active.
     * @return Success message or error message.
     * @example PUT /categories/addCategorie?idCategorie=3&libelle=Toys&actif=true
     * Response: HTTP 200 OK
     * "Categorie ajouté"
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/addCategorie")
    public ResponseEntity<?> addCategorie(@RequestParam int idCategorie, @RequestParam String libelle,
                                          @RequestParam boolean actif) {
        try {
            CategorieService categorieService = new CategorieService(categorieRepository);
            categorieService.addCategorie(idCategorie, libelle, actif);
            System.out.println("Categorie ajouté");
            return new ResponseEntity<>("Categorie ajouté", HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error adding category: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error adding category");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Find categories by their actif status.
     *
     * @param actif The actif status (true or false).
     * @return The categories with the specified actif status.
     * @example GET /categories/findByActif/true
     * Response: HTTP 200 OK
     * [
     *   { "idCategorie": 1, "libelle": "Books", "actif": true }
     * ]
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/findByActif/{actif}")
    public ResponseEntity<?> findByActif(@PathVariable boolean actif) {
        try {
            List<Categorie> categories = categorieRepository.findByActif(actif);
            return new ResponseEntity<>(categories, HttpStatus.OK);
        } catch (Exception e) {
            System.err.println("Error finding category by actif status: " + e.getMessage());
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("message", "Error finding category by actif status");
            errorResponse.put("error", e.getMessage());
            return new ResponseEntity<>(errorResponse, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}