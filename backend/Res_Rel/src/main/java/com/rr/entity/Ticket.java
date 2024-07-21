package com.rr.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idticket")
    private int idticket;

    @Column(name = "objet")
    private String objet;

    @Column(name = "description")
    private String description;

    @Column(name = "etat")
    private boolean etat;

    @Column(name = "nom_createur")
    private String nomCreateur;

    @Column(name = "prenom_createur")
    private String prenomCreateur;

    @Column(name = "citoyen_mail")
    private String citoyenMail;

    // Relation 1,n avec citoyen
    @ManyToOne
    @JoinColumn(name = "citoyen_mail", referencedColumnName = "mail", insertable = false, updatable = false)
    private Citoyen citoyen;

    public Ticket(int idticket, String objet, String description, boolean etat, String nomCreateur, String prenomCreateur, String citoyenMail) {
        this.idticket = idticket;
        this.objet = objet;
        this.description = description;
        this.etat = etat;
        this.nomCreateur = nomCreateur;
        this.prenomCreateur = prenomCreateur;
        this.citoyenMail = citoyenMail;
    }

    public Ticket() {
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
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

    public String getCitoyenMail() {
        return citoyenMail;
    }

    public void setCitoyenMail(String citoyenMail) {
        this.citoyenMail = citoyenMail;
    }

    public Citoyen getCitoyen() {
        Citoyen citoyen = new Citoyen();
        citoyen.setMail(this.citoyen.getMail());
        citoyen.setNom(this.citoyen.getNom());
        citoyen.setPrenom(this.citoyen.getPrenom());
        citoyen.setNumTel(this.citoyen.getNumTel());
        citoyen.setRole(this.citoyen.getRole());
        citoyen.setNumSec(this.citoyen.getNumSec());
        citoyen.setDateNaissance(this.citoyen.getDateNaissance());
        citoyen.setSexe(this.citoyen.getSexe());
        citoyen.setActif(this.citoyen.getActif());
        citoyen.setValidaton(this.citoyen.getValidaton());
        citoyen.setCodePostal(this.citoyen.getCodePostal());
        citoyen.setVille(this.citoyen.getVille());
        citoyen.setDateDerniereConnexion(this.citoyen.getDateDerniereConnexion());
        return citoyen;
    }

    public void setCitoyen(Citoyen citoyen) {
        this.citoyenMail = citoyen.getMail();
        this.citoyen = citoyen;
    }
}
