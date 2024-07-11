package com.rr.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.rr.entity.Ticket;
import com.rr.repository.TicketRepository;
import com.rr.services.TicketService;

@RequestMapping("/api")

public class TicketController {

    private TicketRepository TicketRepository;

    private TicketService TicketService;

    public TicketController(TicketRepository TicketRepository, TicketService TicketService) {
        this.TicketRepository = TicketRepository;
        this.TicketService = TicketService;
    }

    @PutMapping("/api/tickets/ajoutTicket")
    public void ajouterTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur) {
        TicketService.ajouterTicket(idticket, objet, etat, nomCreateur, prenomCreateur, mail_createur);
    }

    @PutMapping("/api/tickets/modifierTicket")
    public void modifierTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur) {
        TicketService.modifierTicket(idticket, objet, etat, nomCreateur, prenomCreateur, mail_createur);
    }

    @DeleteMapping("/api/tickets/supprimerTicket")
    public void supprimerTicket(int idticket) {
        TicketService.supprimerTicket(idticket);
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
