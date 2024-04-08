package com.rr.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class DemandeAmi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private Integer idDemande;
    private Boolean demandeValidee;

    @ManyToOne
    @JoinColumn(name = "idCitoyen", referencedColumnName = "idCitoyen")
    private Citoyen citoyen;

    @ManyToOne
    @JoinColumn(name = "idCitoyen1", referencedColumnName = "idCitoyen")
    private Citoyen ami;

    public Citoyen getAmi() {
        return ami;
    }
    public void setAmi(Citoyen ami) {
        this.ami = ami;
    }
    public Citoyen getCitoyen() {
        return citoyen;
    }
    public void setCitoyen(Citoyen citoyen) {
        this.citoyen = citoyen;
    }
    public Boolean getDemandeValidee() {
        return demandeValidee;
    }
    public void setDemandeValidee(Boolean demandeValidee) {
        this.demandeValidee = demandeValidee;
    }
   

}
