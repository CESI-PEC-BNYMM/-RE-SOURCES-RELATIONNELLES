package com.rr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ressource")
    public int idRessource;
    @Column(name = "type")
    public String type;
    @Column(name = "lien")
    public String lien;
    @Column(name = "extension")
    public String extension;

    // relation 1,n avec Publication
    @ManyToOne
    @JoinColumn(name = "publication_idpublication")
    private Publication publication;

    public int getIdRessource() {
        return idRessource;
    }

    public void setIdRessource(int idRessource) {
        this.idRessource = idRessource;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

}
