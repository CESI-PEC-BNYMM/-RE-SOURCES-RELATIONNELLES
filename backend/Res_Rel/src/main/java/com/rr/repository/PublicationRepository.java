package com.rr.repository;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.Citoyen;
import com.rr.entity.Publication;

@Repository
public interface PublicationRepository  extends JpaRepository<Publication, Integer> {

    Optional<Publication> findById(int idPublication);
    Optional<Publication> findByDatePub(Date datePub);
    List<Publication> findByCitoyen(Citoyen citoyen);
}
