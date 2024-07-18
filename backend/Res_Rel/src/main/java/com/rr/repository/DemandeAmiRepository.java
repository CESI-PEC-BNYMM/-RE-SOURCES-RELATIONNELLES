package com.rr.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.DemandeAmi;

@Repository
public interface DemandeAmiRepository extends JpaRepository<DemandeAmi, Integer> {
    
}
