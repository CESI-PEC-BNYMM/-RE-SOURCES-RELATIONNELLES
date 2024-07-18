package com.rr.entity;

import jakarta.persistence.*;

@Entity
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idRessource;
    public String lien;

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
