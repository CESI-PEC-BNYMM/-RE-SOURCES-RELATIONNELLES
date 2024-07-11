package com.rr.repository;
import java.util.Date;
import java.util.Optional;


import com.rr.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.Publication;

import javax.swing.text.html.Option;

@Repository
public interface PublicationRepository  extends JpaRepository<Publication, Integer> {

    Optional<Publication> findById(int idPublication);
    Optional<Publication> findBydescription(Long description);
    Optional<Publication> findByDatePub(Date DatePub);
    Optional<Publication> report(int idPublication);
    Optional<Publication> delete(int idPublication);
    Optional<Publication> findByEmail(String email);

}
