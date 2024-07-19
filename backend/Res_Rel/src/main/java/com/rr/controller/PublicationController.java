package com.rr.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Publication;
import com.rr.services.PublicationService;
import com.rr.utils.JwtUtil;


@Controller
@RestController
@RequestMapping("/publications")

public class PublicationController{
    private PublicationService publicationservice;

    @Autowired
    public PublicationController(PublicationService publicationservice){

        this.publicationservice = publicationservice;
    }

    @GetMapping("/list")
    public List<Publication> getallpublications(){

        return publicationservice.getAllPublications();
    }

    @DeleteMapping("/delete/{token}/{id}")
    public ResponseEntity<Void> delete_publication(@PathVariable String token, @PathVariable int idPublication) {
        // Extract the email from the token
        String emailUser = JwtUtil.getEmailFromToken(token);

        // Validate the token
        if (!JwtUtil.validateToken(token)) {
            // If the token is invalid, return a bad request response
            return ResponseEntity.badRequest().build();
        }

      /*  Publication publication = publicationservice.findId(idPublication)
                .orElseThrow(() -> new ResourceNotFoundException("Answer Not Found"));*/



        // supprimer la publication
        publicationservice.deletePublication(idPublication);

        // Return a success response
        return ResponseEntity.ok().build();
    }

    @PostMapping("/report/{id}")
    public void ReportPublication(@PathVariable int idPublication){
        this.publicationservice.reportPublication(idPublication);
    }

    @PostMapping("/validate_publi/{idPublication}")
    public void ValidatePublication(@PathVariable int idPublication){
        this.publicationservice.validatePublication(idPublication);
    }

    @PostMapping("/publish/{idPublication}")
    public void PublishPublication (@PathVariable Integer idPublication){

        this.publicationservice.publishPublication(idPublication);
    }

 /*   @GetMapping("/api/publications/{email}")
    public ResponseEntity<List<Publication>> getPublicationsByCitoyenEmail(@PathVariable String email) {
        CitoyenService citoyenService = new CitoyenService();

        Citoyen citoyen =  citoyenService.findbymail(email);
        return (ResponseEntity<List<Publication>>) getallpublications(citoyen);
    }*/
}