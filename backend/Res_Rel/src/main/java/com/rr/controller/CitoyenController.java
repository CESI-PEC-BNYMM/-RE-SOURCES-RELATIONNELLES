package com.rr.controller;
import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Citoyen;
import com.rr.services.CitoyenService;
@Controller
@RestController
@RequestMapping("/api")

public class CitoyenController {

    private CitoyenService citoyenService;

    public CitoyenController(CitoyenService citoyenService) {
        this.citoyenService = citoyenService;
    }

    @GetMapping("/list")
    public List<Citoyen> getAllCitoyen() {
        return citoyenService.findAll();
    }
}