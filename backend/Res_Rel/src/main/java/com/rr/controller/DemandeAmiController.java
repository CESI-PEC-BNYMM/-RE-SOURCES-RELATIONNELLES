package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.ResourceNotFoundException;
import com.rr.entity.DemandeAmi;
import com.rr.repository.DemandeAmiRepository;
import com.rr.services.DemandeAmiService;

@RestController
@RequestMapping("/api")

public class DemandeAmiController {

    @Autowired
    private DemandeAmiService demandeAmiService;

    @GetMapping("/api/demandeAmi/list/")
    public String getMethodName(@RequestParam String param) {
        return new String();
    }

    @PostMapping("/api/demande_ami/accept_friend/{token}/{idDemandeAmi}")
public ResponseEntity<Void> accepterDemandeAmi(@PathVariable String token, @PathVariable int idDemandeAmi) {
    String emailUser = jwtUtil.getEmailFromToken(token);
    if (!jwtUtil.validateToken(token)) {
        return ResponseEntity.badRequest().build();
    }

    DemandeAmi demande = demandeAmiRepository.findById(idDemandeAmi)
            .orElseThrow(() -> new ResourceNotFoundException("Demande d'ami introuvable"));

    if (!demande.getCitoyenreceveur().getMail().equals(emailUser)) {
        return ResponseEntity.badRequest().build();
    }

    demande.setDemandeValidee(true);
    demandeAmiRepository.save(demande);

    return ResponseEntity.ok().build();
}


    @Autowired
    private DemandeAmiController(DemandeAmiRepository demandeAmiRepository) {
        this.demandeAmiRepository = demandeAmiRepository;
    }

    private DemandeAmiRepository demandeAmiRepository;

}
