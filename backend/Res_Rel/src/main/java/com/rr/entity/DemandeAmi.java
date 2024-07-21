package com.rr.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class DemandeAmi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_demande_ami")
    private int idDemandeAmi;
    @Column(name = "demande_validee")
    private Boolean demandeValidee;

    //relation avec citoyen de type 1,N
    @ManyToOne(fetch = FetchType.LAZY) //FetchType = LAZY est efficace dans les scenarios où j'ai pas besoiin de load citoyen à chaque fois que j'appelle DemandeAmi
    @JoinColumn(name = "citoyen_mail") // This column in DemandeAmi table will store the foreign key
    @JsonBackReference
    private Citoyen citoyen;
    // relation avec le destinataire de la demande d'ami
    @ManyToOne
    @JoinColumn(name = "citoyen_mail1", referencedColumnName = "mail")
    @JsonBackReference
    private Citoyen citoyenreceveur;


    public int getIdDemandeAmi() {
        return idDemandeAmi;
    }

    public void setIdDemandeAmi(int idDemandeAmi) {
        this.idDemandeAmi = idDemandeAmi;
    }

    public Boolean getDemandeValidee() {
        return demandeValidee;
    }

    public void setDemandeValidee(Boolean demandeValidee) {
        this.demandeValidee = demandeValidee;
    }

    public Citoyen getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(Citoyen citoyen) {
        this.citoyen = citoyen;
    }

    public Citoyen getCitoyenreceveur() {
        return citoyenreceveur;
    }

    public void setCitoyenreceveur(Citoyen citoyenreceveur) {
        this.citoyenreceveur = citoyenreceveur;
    }
}
