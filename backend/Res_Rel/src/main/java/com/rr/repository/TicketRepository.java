package com.rr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rr.entity.Ticket;



public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    public void ajouterTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur, int idcitoyen);

    public void modifierTicket(int idticket, String objet, boolean etat, String nomCreateur, String prenomCreateur, String mail_createur, int idcitoyen);

    public void supprimerTicket(int idticket);

    public List<Ticket> findByIdticket(int idticket);

    public List<Ticket> findByEtat(boolean etat);

    public List<Ticket> findByNomCreateur(String nomCreateur);

}
