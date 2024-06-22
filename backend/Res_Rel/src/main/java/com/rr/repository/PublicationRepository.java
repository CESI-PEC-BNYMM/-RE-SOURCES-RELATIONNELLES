package com.rr.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.rr.entity.Publication;

@Repository
public interface PublicaitonRepository extends JpaRepository<Publication, int>{

    Optional<Publication> findByIdPublication(int idPublication);
    Optional<Publication> findByCategorie(Categorie categorie);
    Optional<Publication> findByCitoyen(Citoyen citoyen);
    

}