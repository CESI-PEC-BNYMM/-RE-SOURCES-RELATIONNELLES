package com.rr.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Categorie;
import com.rr.repository.CategorieRepository;

@RestController
@RequestMapping("/api")

public class CategorieController {

    @Autowired
    public CategorieController(CategorieRepository categorieRepository) {
        this.categorieRepository = categorieRepository;
    }

    private CategorieRepository categorieRepository;
    @GetMapping("/categories/list")
    public List<Categorie> getAllCategorie() {
        return categorieRepository.findAll();
    }
}
