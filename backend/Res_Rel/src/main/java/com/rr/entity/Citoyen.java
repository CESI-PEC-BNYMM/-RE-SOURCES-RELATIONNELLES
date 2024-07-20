package com.rr.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;

@Entity

public class Citoyen {

    @Id
    @Column(name = "mail")
    private String mail;

    @Column(name = "mdp")
    private String mdp;

    @Column(name = "nom")
    private String nom;

    @Column(name = "prenom")
    private String prenom;

    @Column(name = "num_tel")
    private String numTel;

    @Column(name = "role")
    private String role;

    @Column(name = "num_sec")
    private String numSec;

    @Column(name = "date_naissance")
    private Date dateNaissance;

    @Column(name = "sexe")
    private char sexe;

    @Column(name = "actif")
    private boolean actif;

    @Column(name = "validaton")
    private int validaton;

    @Column(name = "code_postal")
    private String codePostal;

    @Column(name = "ville")
    private String ville;

    @Column(name = "date_derniere_connexion")
    private Date dateDerniereConnexion;

    @OneToMany(mappedBy = "citoyen", fetch = FetchType.LAZY)
    private List<DemandeAmi> demandeenvoyee;

    @OneToMany(mappedBy = "citoyenreceveur")
    private List<DemandeAmi> demandesAmiRecues;

    @OneToMany(mappedBy = "citoyen", fetch = FetchType.LAZY)
    private List<Publication> pub;

    @OneToMany(mappedBy = "citoyen")
    private List<Commentaire> commentaires;

    @OneToMany(mappedBy = "citoyen", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Ticket> tickets;

    public String getMdp() {
        return mdp;
    }

    public void setMdp(String mdp) {
        this.mdp = mdp;
    }

    public String getNom() {
        return nom;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getPrenom() {
        return prenom;
    }

    public void setPrenom(String prenom) {
        this.prenom = prenom;
    }

    public String getMail() {
        return mail;
    }

    public void setMail(String mail) {
        this.mail = mail;
    }

    public String getNumTel() {
        return numTel;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public Date getDateNaissance() {
        return dateNaissance;
    }

    public void setDateNaissance(Date dateNaissance) {
        this.dateNaissance = dateNaissance;
    }

    public char getSexe() {
        return sexe;
    }

    public void setSexe(char sexe) {
        this.sexe = sexe;
    }

    public boolean isActif() {
        return actif;
    }

    public void setActif(boolean actif) {
        this.actif = actif;
    }

    public int getValidaton() {
        return validaton;
    }

    public void setValidaton(int validaton) {
        this.validaton = validaton;
    }

    public String getCodePostal() {
        return codePostal;
    }

    public void setCodePostal(String codePostal) {
        this.codePostal = codePostal;
    }

    public String getVille() {
        return ville;
    }

    public void setVille(String ville) {
        this.ville = ville;
    }

    public Date getDateDerniereConnexion() {
        return dateDerniereConnexion;
    }

    public void setDateDerniereConnexion(Date dateDerniereConnexion) {
        this.dateDerniereConnexion = dateDerniereConnexion;
    }

    public List<DemandeAmi> getDemandeenvoyee() {
        return demandeenvoyee;
    }

    public void setNumTel(String numTel) {
        this.numTel = numTel;
    }

    public String getNumSec() {
        return numSec;
    }

    public void setNumSec(String numSec) {
        this.numSec = numSec;
    }

    public void setDemandeenvoyee(List<DemandeAmi> demandeenvoyee) {
        this.demandeenvoyee = demandeenvoyee;
    }

    public List<DemandeAmi> getDemandesAmiRecues() {
        return demandesAmiRecues;
    }

    public void setDemandesAmiRecues(List<DemandeAmi> demandesAmiRecues) {
        this.demandesAmiRecues = demandesAmiRecues;
    }

    public List<Publication> getPub() {
        return pub;
    }

    public void setPub(List<Publication> pub) {
        this.pub = pub;
    }

    public List<Commentaire> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(List<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    public List<Ticket> getTickets() {
        return tickets;
    }

    public void setTickets(List<Ticket> tickets) {
        this.tickets = tickets;
    }


//Getter et setters


}
