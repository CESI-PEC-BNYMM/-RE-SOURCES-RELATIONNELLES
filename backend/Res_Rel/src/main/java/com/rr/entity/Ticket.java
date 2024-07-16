package com.rr.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket {

    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)

    private int idticket;
    private String objet;
    private boolean etat;
    private String nomCreateur;
    private String prenomCreateur;
    private String mail_createur;

    // Relation 1,n avec citoyen
    @ManyToOne
    @JoinColumn(name = "citoyen_mail")
    private Citoyen citoyen;

    public int getIdticket() {
        return idticket;
    }

    public void setIdticket(int idticket) {
        this.idticket = idticket;
    }

    public String getObjet() {
        return objet;
    }

    public void setObjet(String objet) {
        this.objet = objet;
    }

    public boolean isEtat() {
        return etat;
    }

    public void setEtat(boolean etat) {
        this.etat = etat;
    }

    public String getNomCreateur() {
        return nomCreateur;
    }

    public void setNomCreateur(String nomCreateur) {
        this.nomCreateur = nomCreateur;
    }

    public String getPrenomCreateur() {
        return prenomCreateur;
    }

    public void setPrenomCreateur(String prenomCreateur) {
        this.prenomCreateur = prenomCreateur;
    }

    public String getMail_createur() {
        return mail_createur;
    }

    public void setMail_createur(String mail_createur) {
        this.mail_createur = mail_createur;
    }
}
