package com.example.exemple.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.exemple.utilisateur;

public interface UtilisateurRepository extends JpaRepository<utilisateur, Long> {
    utilisateur findByIdentifiant(String identifiant);

}