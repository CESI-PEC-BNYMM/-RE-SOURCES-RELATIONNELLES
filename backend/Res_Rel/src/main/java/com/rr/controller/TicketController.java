package com.rr.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.entity.Ticket;
import com.rr.repository.TicketRepository;
import com.rr.services.TicketService;

@RestController
@Controller
@RequestMapping("/api")

public class TicketController {

    private TicketRepository TicketRepository;

    private TicketService TicketService;

    public TicketController(TicketRepository TicketRepository, TicketService TicketService) {
        this.TicketRepository = TicketRepository;
        this.TicketService = TicketService;
    }

    @PutMapping("/api/tickets/ajoutTicket")
    public ResponseEntity<Ticket> ajouterTicket(
        @RequestParam("Object") String objet,
        @RequestParam("Etat") boolean etat,
        @RequestParam("NomCreateur") String nomCreateur,
        @RequestParam("PrenomCreateur") String prenomCreateur,
        @RequestParam("Mail_createur") String mail_createur) {
            Ticket ticket = TicketService.ajouterTicket(objet, etat, nomCreateur, prenomCreateur, mail_createur);
            return ResponseEntity.ok(ticket);
        }

    @PutMapping("/api/tickets/modifierTicket")
    public ResponseEntity<Ticket>modifierTicket(
         @PathVariable("id") int id,
         @RequestParam("Object") String objet,
         @RequestParam("Etat") boolean etat,
         @RequestParam("NomCreateur") String nomCreateur,
         @RequestParam("PrenomCreateur") String prenomCreateur,
         @RequestParam("Mail_createur") String mail_createur) {
            Ticket ticket = TicketService.modifierTicket(id, objet, etat, nomCreateur, prenomCreateur, mail_createur);
            return ResponseEntity.ok(ticket);
    }

    @DeleteMapping("api/tickets/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable int id) {
        if (!TicketRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        TicketRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/api/tickets/findByEtat")
    public List<Ticket> findByEtat(boolean etat) {
        return TicketService.findByEtat(etat);
    }

    @GetMapping("/api/tickets/findByNomCreateur")
    public List<Ticket> findByNomCreateur(String nomCreateur) {
        return TicketService.findByNomCreateur(nomCreateur);
    }
}
