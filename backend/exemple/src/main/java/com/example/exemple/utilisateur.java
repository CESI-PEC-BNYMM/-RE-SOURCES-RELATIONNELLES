package com.example.exemple;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class utilisateur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String identifiant;
    private String motdepasse;

    //Getter et setters
    
    public long getId() {
        return id;
    }
    public void setId(long id) {
        this.id = id;
    }
    public String getIdentifiant() {
        return identifiant;
    }
    public void setIdentifiant(String identifiant) {
        this.identifiant = identifiant;
    }
    public String getMotdepasse() {
        return motdepasse;
    }
    public void setMotdepasse(String motdepasse) {
        this.motdepasse = motdepasse;
    }

}
