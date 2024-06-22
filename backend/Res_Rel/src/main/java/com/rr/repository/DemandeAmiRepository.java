package com.rr.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.rr.entity.DemandeAmi;
import org.springframework.stereotype.Repository;

@Repository
public interface DemandeAmiRepository extends JpaRepository<DemandeAmi, Integer> {
    
}
