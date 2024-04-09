package com.rr.entity;

import java.util.Date;
import java.util.List;
import java.util.Set;

import jakarta.persistence.*;

@Entity

public class Citoyen {


    private String mdp;
    private String nom;
    private String prenom;
    @Id private String mail;
    //@Column(name = "numTel") // ca sert
    private String numTel;
    private String role;
    private String numSec;
    private Date dateNaissance;
    private char sexe;
    private boolean actif;
    private int validaton;
    private String codePostal;
    private String ville;
    private Date dateDerniereConnexion;



    // relation 1,N avec DemandeAmi
    @OneToMany(mappedBy = "citoyen", fetch = FetchType.LAZY)
    private List<DemandeAmi> demandeenvoyee;

    @OneToMany(mappedBy = "citoyenreceveur")
    private List<DemandeAmi> demandesAmiRecues; // Liste des demandes d'ami reçues par le citoyen

    // relation 1,N avec Publication
    @OneToMany(mappedBy = "citoyen", fetch = FetchType.LAZY)
    private List<Publication> pub;

    // relation 1,N avec Publication
    @OneToMany(mappedBy = "citoyen")
    private List<Commentaire> commentaires;

    // relation 1,N avec ticket
    @OneToMany(mappedBy = "citoyen")
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

    public String getNum_tel() {
        return numTel;
    }

    public void setNum_tel(String num_tel) {
        this.numTel = num_tel;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNum_sec() {
        return numSec;
    }

    public void setNum_sec(String num_sec) {
        this.numSec = num_sec;
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

    public Set<DemandeAmi> getDemandeenvoyee() {
        return (Set<DemandeAmi>) demandeenvoyee;
    }

    public void setDemandeenvoyee(Set<DemandeAmi> demandeenvoyee) {
        this.demandeenvoyee = (List<DemandeAmi>) demandeenvoyee;
    }

    //Getter et setters


}
