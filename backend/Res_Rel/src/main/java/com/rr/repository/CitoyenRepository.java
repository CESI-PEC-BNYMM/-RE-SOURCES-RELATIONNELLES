package com.rr.repository;

import java.util.List;
import java.util.Optional;

import com.rr.entity.Publication;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.rr.entity.Citoyen;

@Repository
public interface CitoyenRepository extends JpaRepository<Citoyen, String> {

    Optional<Citoyen> findByMail(String mail);
    Optional<Citoyen> deleteByMail(String mail);
    List<Citoyen> findAll();
}