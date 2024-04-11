package com.rr.entity;

import jakarta.persistence.*;

@Entity
public class DemandeAmi {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idDemandeAmi;
    private Boolean demandeValidee;

    //relation avec citoyen de type 1,N
    @ManyToOne(fetch = FetchType.LAZY) //FetchType = LAZY est efficace dans les scenarios où j'ai pas besoiin de load citoyen à chaque fois que j'appelle DemandeAmi
    @JoinColumn(name = "citoyen_mail") // This column in DemandeAmi table will store the foreign key
    private Citoyen citoyen;
    // relation avec le destinataire de la demande d'ami
    @ManyToOne
    @JoinColumn(name = "citoyen_mail1", referencedColumnName = "mail")
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
}
