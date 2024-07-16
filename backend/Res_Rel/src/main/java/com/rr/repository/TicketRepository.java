package com.rr.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.Ticket;


@Repository
public interface TicketRepository extends JpaRepository<Ticket, Integer> {

    public List<Ticket> findByIdticket(int idticket);

    public List<Ticket> findByEtat(boolean etat);

    public List<Ticket> findByNomCreateur(String nomCreateur);

}
