package com.rr.entity;

import jakarta.persistence.*;

@Entity
public class Ressource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public int idRessource;
    public String type;
    public String lien;
    public String extension;

    @OneToMany(mappedBy = "Ressource")

    public int getIdRessource() {
        return idRessource;
    }

    public void setIdRessource(int idRessource) {
        this.idRessource = idRessource;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLien() {
        return lien;
    }

    public void setLien(String lien) {
        this.lien = lien;
    }

    public String getExtension() {
        return extension;
    }

    public void setExtension(String extension) {
        this.extension = extension;
    }
}
