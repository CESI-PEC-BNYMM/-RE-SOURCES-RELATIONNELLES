package com.rr.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.rr.entity.Ticket;
import com.rr.entity.Citoyen;
import com.rr.repository.TicketRepository;
import com.rr.repository.CitoyenRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository TicketRepository;

    @Autowired
    private CitoyenRepository citoyenRepository;

    public TicketService(TicketRepository TicketRepository) {
        this.TicketRepository = TicketRepository;
    }
    //méthode pour trouver un ticket avec son id
    public Ticket findByIdTicket(int idticket) {
        return TicketRepository.findById(idticket)
     .orElseThrow(() -> new RuntimeException("Aucun Ticket n'existe avec cet id"));
    }

    // méthode pour créer un ticket
    public Ticket ajouterTicket(String objet, String description, boolean etat, String nomCreateur, String prenomCreateur, String citoyenMail) throws Exception {
        // Check if the citoyen exists only if citoyenMail is not null
        if (citoyenMail != null) {
            if (!citoyenRepository.existsById(citoyenMail)) {
                throw new Exception("No matching citoyen found for email: " + citoyenMail);
            }
        }

        // Create and populate the Ticket entity
        Ticket ticket = new Ticket();
        ticket.setObjet(objet);
        ticket.setDescription(description);
        ticket.setEtat(etat);
        ticket.setNomCreateur(nomCreateur);
        ticket.setPrenomCreateur(prenomCreateur);
        ticket.setCitoyen(citoyenRepository.findByMail(citoyenMail).get());

        try {
            // Save the ticket
            return TicketRepository.save(ticket);
        } catch (DataIntegrityViolationException e) {
            // Handle exception if any constraint violations occur
            throw new Exception("Error saving ticket: " + e.getMessage(), e);
        }
    }

    //méthode pour modifier un ticket
    public Ticket modifierTicket(int idticket, String description, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur) {
        if (!citoyenRepository.existsById(mail_createur)) {
            throw new RuntimeException("Aucun citoyen n'existe avec cet email");
        }
        Ticket ticket = TicketRepository.findById(idticket)
                .orElseThrow(() -> new RuntimeException("Aucun ticket n'existe avec cet id"));
        ticket.setDescription(description);
        ticket.setObjet(objet);
        ticket.setEtat(etat);
        ticket.setNomCreateur(nomCreateur);
        ticket.setPrenomCreateur(prenomCreateur);
        ticket.setCitoyen(citoyenRepository.findByMail(mail_createur).get());
        return TicketRepository.save(ticket);
    }

    //méthode pour supprimer un ticket
    public void supprimerTicket(int idticket) {
        TicketRepository.deleteById(idticket);
        System.out.println("Ticket supprimé");
    }

    //méthode pour trouver les tickets par leur etat
    public List<Ticket> findByEtat(boolean etat) {
        return Optional.ofNullable(TicketRepository.findByEtat(etat))
                .orElseThrow(() -> new RuntimeException("Aucun ticket n'existe avec cet etat"));
    }

    //méthode pour trouver les tickets par leur nom d'utilisateur
    public List<Ticket> findByNomCreateur(String nomCreateur) {
        return Optional.ofNullable(TicketRepository.findByNomCreateur(nomCreateur))
                .orElseThrow(() -> new RuntimeException(nomCreateur + "n'as pas de ticket"));
    }

}
