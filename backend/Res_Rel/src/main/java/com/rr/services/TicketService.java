package com.rr.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.rr.entity.Ticket;
import com.rr.repository.CitoyenRepository;
import com.rr.repository.TicketRepository;

@Service
public class TicketService {

    @Autowired
    private TicketRepository TicketRepository;

    @Autowired
    private CitoyenRepository citoyenRepository;

    public TicketService(TicketRepository TicketRepository) {
        this.TicketRepository = TicketRepository;
    }

    /**
     * Find a ticket by its ID.
     * 
     * @param idticket The ID of the ticket to find
     * @return The ticket if found
     * @throws RuntimeException if no ticket exists with the given ID
     */
    public Ticket findByIdTicket(int idticket) {
        return TicketRepository.findById(idticket)
                .orElseThrow(() -> new RuntimeException("Aucun Ticket n'existe avec cet id"));
    }

    /**
     * Add a new ticket to the repository.
     * 
     * @param objet          The subject of the ticket.
     * @param description    The description of the ticket.
     * @param etat           The state of the ticket.
     * @param nomCreateur    The first name of the ticket creator.
     * @param prenomCreateur The last name of the ticket creator.
     * @param citoyenMail    The email of the ticket creator.
     * @return The created ticket.
     * @throws Exception If the citoyen with the given email does not exist or if
     *                   any constraint violations occur.
     */
    public Ticket ajouterTicket(String objet, String description, boolean etat, String nomCreateur,
            String prenomCreateur, String citoyenMail) throws Exception {
        // Check if the citoyen exists only if citoyenMail is not null
        if (citoyenMail != null) {
            // Check if a citoyen with the given email exists
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
        // Find the citoyen with the given email
        ticket.setCitoyen(citoyenRepository.findByMail(citoyenMail).get());

        try {
            // Save the ticket
            return TicketRepository.save(ticket);
        } catch (DataIntegrityViolationException e) {
            // Handle exception if any constraint violations occur
            throw new Exception("Error saving ticket: " + e.getMessage(), e);
        }
    }

    /**
     * Modifies an existing ticket.
     * 
     * @param idticket       The ID of the ticket to modify.
     * @param description    The new description of the ticket.
     * @param objet          The new subject of the ticket.
     * @param etat           The new state of the ticket.
     * @param nomCreateur    The new first name of the ticket creator.
     * @param prenomCreateur The new last name of the ticket creator.
     * @param mail_createur  The new email of the ticket creator.
     * @return The updated ticket.
     * @throws RuntimeException If no citoyen exists with the given email or no
     *                          ticket exists with the given ID.
     */
    public Ticket modifierTicket(int idticket, String description, String objet, boolean etat, String nomCreateur,
            String prenomCreateur, String mail_createur) {
        // Check if a citoyen with the given email exists
        if (!citoyenRepository.existsById(mail_createur)) {
            throw new RuntimeException("Aucun citoyen n'existe avec cet email");
        }

        // Find the ticket with the given ID
        Ticket ticket = TicketRepository.findById(idticket)
                .orElseThrow(() -> new RuntimeException("Aucun ticket n'existe avec cet id"));

        // Update the ticket fields
        ticket.setDescription(description);
        ticket.setObjet(objet);
        ticket.setEtat(etat);
        ticket.setNomCreateur(nomCreateur);
        ticket.setPrenomCreateur(prenomCreateur);
        ticket.setCitoyen(citoyenRepository.findByMail(mail_createur).get());

        // Save the updated ticket
        return TicketRepository.save(ticket);
    }

    /**
     * Deletes a ticket by its ID.
     * 
     * @param idticket The ID of the ticket to delete.
     */
    public void supprimerTicket(int idticket) {
        TicketRepository.deleteById(idticket);
        System.out.println("Ticket supprimé");
    }

    /**
     * Retrieves tickets by their state.
     * 
     * @param etat The state of the tickets to retrieve.
     * @return A list of tickets with the specified state.
     * @throws RuntimeException If no tickets exist with the given state.
     */
    public List<Ticket> findByEtat(boolean etat) {
        // Find tickets by their state
        return Optional.ofNullable(TicketRepository.findByEtat(etat))
                // Throw an exception if no tickets exist with the given state
                .orElseThrow(() -> new RuntimeException("Aucun ticket n'existe avec cet etat"));
    }

    /**
     * Retrieves tickets by the creator's first name.
     * 
     * @param nomCreateur The first name of the ticket creator.
     * @return A list of tickets created by the specified first name or an exception
     *         if none exist.
     * @throws RuntimeException If no tickets exist with the given first name.
     */
    public List<Ticket> findByNomCreateur(String nomCreateur) {
        // Find tickets by the creator's first name
        return Optional.ofNullable(TicketRepository.findByNomCreateur(nomCreateur))
                // Throw an exception if no tickets exist with the given first name
                .orElseThrow(() -> new RuntimeException("No tickets exist with the given first name: " + nomCreateur));
    }

}
