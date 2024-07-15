package com.rr.controller;
import com.rr.entity.Citoyen;
import com.rr.entity.Publication;
import java.util.List;

import com.rr.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.rr.services.CitoyenService;
@Controller
@RestController
@RequestMapping("/api")

public class CitoyenController {

    private CitoyenService citoyenService;

    public CitoyenController (CitoyenService citoyenService){
        this.citoyenService = citoyenService;
    }

    @GetMapping("/api/citoyen/list/")
    public List<Citoyen> getAllCitoyen(){
        return citoyenService.findAll();
    }



}
