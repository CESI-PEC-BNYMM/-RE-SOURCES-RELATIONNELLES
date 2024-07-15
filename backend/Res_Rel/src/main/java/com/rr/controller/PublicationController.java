package com.rr.controller;
import com.rr.entity.Citoyen;
import com.rr.entity.Publication;
import java.util.List;

import com.rr.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import com.rr.services.PublicationService;
import com.rr.services.CitoyenService;


@Controller
@RestController
@RequestMapping("/api")

public class PublicationController{
    private PublicationService publicationservice;

    @Autowired
    public PublicationController(PublicationService publicationservice){

        this.publicationservice = publicationservice;
    }

    @GetMapping("/publications/list")
    public List<Publication> getallpublications(){

        return publicationservice.getAllPublications();
    }

    @DeleteMapping("/api/publications/delete/{token}/{id}")
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

    @PostMapping("/api/publication/report/{id}")
    public void ReportPublication(@PathVariable int idPublication){
        this.publicationservice.reportPublication(idPublication);
    }

    @PostMapping("/api/publications/validate_publi/{idPublication}")
    public void ValidatePublication(@PathVariable int idPublication){
        this.publicationservice.validatePublicaiton(idPublication);
    }

    @PostMapping("/api/publication/publish/{idPublication}")
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
