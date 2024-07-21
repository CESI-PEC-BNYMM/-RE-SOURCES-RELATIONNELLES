package com.rr.repository;

import org.hibernate.mapping.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.lang.Integer;

import com.rr.entity.DemandeAmi;

@Repository
public interface DemandeAmiRepository extends JpaRepository<DemandeAmi, Integer> {
    java.util.List<DemandeAmi> findByCitoyenreceveurMail(String emailUser);
}
