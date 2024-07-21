package com.rr.entity;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class ChoixSondageCitoyen {

    @Id
    private String choixSondageCitoyen;

    @OneToMany(mappedBy = "ChoixSondageCitoyen")
    public String getChoixSondageCitoyen() {
        return choixSondageCitoyen;
    }

    public void setChoixSondageCitoyen(String choixSondageCitoyen) {
        this.choixSondageCitoyen = choixSondageCitoyen;
    }
}
