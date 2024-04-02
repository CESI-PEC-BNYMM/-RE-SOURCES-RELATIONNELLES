package com.example.exemple;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<utilisateur, Long> {
    utilisateur findByIdentifiant(String identifiant);

}