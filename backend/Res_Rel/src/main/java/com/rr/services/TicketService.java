package com.rr.services;

import java.util.List;
import java.util.Optional;

import com.rr.entity.Ticket;
import com.rr.repository.TicketRepository;

public class TicketService {

    private TicketRepository TicketRepository;

    public TicketService(TicketRepository TicketRepository) {
        this.TicketRepository = TicketRepository;
    }
    //méthode pour trouver un ticket avec son id
    public Ticket findByIdTicket(int idticket) {
        return TicketRepository.findById(idticket)
     .orElseThrow(() -> new RuntimeException("Aucun Ticket n'existe avec cet id"));
    }

    // méthode pour créer un ticket
    public void ajouterTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur) {
        Ticket ticket = new Ticket();

        // affectation des valeurs
        ticket.setIdticket(idticket);
        ticket.setObjet(objet);
        ticket.setEtat(etat);
        ticket.setNomCreateur(nomCreateur);
        ticket.setPrenomCreateur(prenomCreateur);
        ticket.setMail_createur(mail_createur);

        TicketRepository.save(ticket);
        
    }

    //méthode pour modifier un ticket
    public void modifierTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur) {
        Ticket ticket = findByIdTicket(idticket);
        ticket.setIdticket(idticket);
        ticket.setObjet(objet);
        ticket.setEtat(etat);
        ticket.setNomCreateur(nomCreateur);
        ticket.setPrenomCreateur(prenomCreateur);
        ticket.setMail_createur(mail_createur);
        TicketRepository.save(ticket);

    }

    //méthode pour supprimer un ticket
    public void supprimerTicket(int idticket) {
        TicketRepository.deleteById(idticket);
        System.out.println("Ticket supprimé");
    }

    //méthode pour trouver les tickets par leur etat
    public List<Ticket> findByEtat(boolean etat) {
        return Optional.ofNullable(TicketRepository.findByEtat(etat))
                .orElseThrow(() -> new RuntimeException("Aucun Ticket n'existe avec cet etat"));
    }

    //méthode pour trouver les tickets par leur nom d'utilisateur
    public List<Ticket> findByNomCreateur(String nomCreateur) {
        return Optional.ofNullable(TicketRepository.findByNomCreateur(nomCreateur))
                .orElseThrow(() -> new RuntimeException(nomCreateur + "n'as pas de ticket"));
    }

}
