package com.rr.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
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
@RequestMapping("/tickets")
public class TicketController {

    private final TicketRepository ticketRepository;
    private final TicketService ticketService;

    public TicketController(TicketRepository ticketRepository, TicketService ticketService) {
        this.ticketRepository = ticketRepository;
        this.ticketService = ticketService;
    }

    /**
     * Adds a new ticket.
     * 
     * @param objet The subject of the ticket.
     * @param etat The state of the ticket.
     * @param nomCreateur The first name of the ticket creator.
     * @param prenomCreateur The last name of the ticket creator.
     * @param mail_createur The email of the ticket creator.
     * @return The created ticket or an error message.
     * @example PUT /tickets/ajoutTicket
     */
    @PutMapping("/ajoutTicket")
    public ResponseEntity<?> ajouterTicket(
        @RequestParam("Object") String objet,
        @RequestParam("Etat") boolean etat,
        @RequestParam("NomCreateur") String nomCreateur,
        @RequestParam("PrenomCreateur") String prenomCreateur,
        @RequestParam("Mail_createur") String mail_createur) {
        try {
            Ticket ticket = ticketService.ajouterTicket(objet, etat, nomCreateur, prenomCreateur, mail_createur);
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            System.err.println("Error adding ticket: " + e.getMessage());
            return ResponseEntity.status(500).body("Error adding ticket");
        }
    }

    /**
     * Modifies an existing ticket.
     * 
     * @param id The ID of the ticket to modify.
     * @param objet The new subject of the ticket.
     * @param etat The new state of the ticket.
     * @param nomCreateur The new first name of the ticket creator.
     * @param prenomCreateur The new last name of the ticket creator.
     * @param mail_createur The new email of the ticket creator.
     * @return The updated ticket or an error message.
     * @example PUT /tickets/modifierTicket/{id}
     */
    @PutMapping("/modifierTicket/{id}")
    public ResponseEntity<?> modifierTicket(
        @PathVariable("id") int id,
        @RequestParam("Object") String objet,
        @RequestParam("Etat") boolean etat,
        @RequestParam("NomCreateur") String nomCreateur,
        @RequestParam("PrenomCreateur") String prenomCreateur,
        @RequestParam("Mail_createur") String mail_createur) {
        try {
            Ticket ticket = ticketService.modifierTicket(id, objet, etat, nomCreateur, prenomCreateur, mail_createur);
            if (ticket == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(ticket);
        } catch (Exception e) {
            System.err.println("Error modifying ticket: " + e.getMessage());
            return ResponseEntity.status(500).body("Error modifying ticket");
        }
    }

    /**
     * Deletes a ticket by its ID.
     * 
     * @param id The ID of the ticket to delete.
     * @return A response indicating the success or failure of the operation.
     * @example DELETE /tickets/{id}
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTicket(@PathVariable int id) {
        try {
            if (!ticketRepository.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            ticketRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            System.err.println("Error deleting ticket: " + e.getMessage());
            return ResponseEntity.status(500).body("Error deleting ticket");
        }
    }

    /**
     * Retrieves tickets by their state.
     * 
     * @param etat The state of the tickets to retrieve.
     * @return A list of tickets with the specified state or an error message.
     * @example GET /tickets/findByEtat?etat=true
     */
    @GetMapping("/findByEtat")
    public ResponseEntity<?> findByEtat(@RequestParam("etat") boolean etat) {
        try {
            List<Ticket> tickets = ticketService.findByEtat(etat);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            System.err.println("Error finding tickets by state: " + e.getMessage());
            return ResponseEntity.status(500).body("Error finding tickets by state");
        }
    }

    /**
     * Retrieves tickets by the creator's first name.
     * 
     * @param nomCreateur The first name of the ticket creator.
     * @return A list of tickets created by the specified first name or an error message.
     * @example GET /tickets/findByNomCreateur?nomCreateur=John
     */
    @GetMapping("/findByNomCreateur")
    public ResponseEntity<?> findByNomCreateur(@RequestParam("nomCreateur") String nomCreateur) {
        try {
            List<Ticket> tickets = ticketService.findByNomCreateur(nomCreateur);
            return ResponseEntity.ok(tickets);
        } catch (Exception e) {
            System.err.println("Error finding tickets by creator's name: " + e.getMessage());
            return ResponseEntity.status(500).body("Error finding tickets by creator's name");
        }
    }
}