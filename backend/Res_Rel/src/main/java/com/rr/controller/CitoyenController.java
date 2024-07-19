package com.rr.controller;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Citoyen;
import com.rr.services.CitoyenService;
@Controller
@RestController
@RequestMapping("/citoyen")

public class CitoyenController {

    private CitoyenService citoyenService;

    public CitoyenController(CitoyenService citoyenService) {
        this.citoyenService = citoyenService;
    }

    @GetMapping("/list")
    public List<Citoyen> getAllCitoyen() {
        return citoyenService.findAll();
    }

    @PostMapping("/remove/{emailUser}")
    public void removeCitoyen(@PathVariable Citoyen citoyen){
        this.citoyenService.removeCitoyen(citoyen);
    }

    @PostMapping("/validate_user/{emailUser}")
    public void validateCitoyen(@PathVariable Citoyen citoyen){

        citoyenService.validateCitoyen(citoyen);

    }

    @PostMapping("/update/{emailUser}")
    public void update(@PathVariable Citoyen citoyen, @RequestParam String name, @RequestParam String prenom, @RequestParam String mail, @RequestParam String numTel, @RequestParam String numSec,@RequestParam String role, @RequestParam Date dateNaissance, @RequestParam char sexe, @RequestParam int validaton, @RequestParam String codePostal, @RequestParam String ville, @RequestParam String mdp ){


        citoyenService.update(citoyen, name, prenom, mail, numSec, numTel,
                role, dateNaissance, sexe, validaton, codePostal, ville, mdp );





    }
}