package com.rr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rr.entity.Citoyen;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UtilisateurRepository extends JpaRepository<Citoyen, String> {

    Optional<Citoyen> findByMail(String mail);

}