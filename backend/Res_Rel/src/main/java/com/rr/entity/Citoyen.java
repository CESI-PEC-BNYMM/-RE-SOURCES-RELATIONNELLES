package com.rr.entity;

import java.util.Date;
import java.util.Set;

import jakarta.persistence.*;

@Entity

public class Citoyen {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int idCitoyen;
    private String mdp;
    private String nom;
    private String prenom;
    private String mail;
    private String NumTel;
    private String role;
    private String NumSec;
    private Date dateNaissance;
    private char sexe;
    private boolean actif;
    private int validation;
    private String codePostal;
    private String ville;
    private Date dateDerniereModif;

    @OneToMany(mappedBy = "Citoyen")
    private Set<DemandeAmi> demandes;

    public int getIdCitoyen() {
        return idCitoyen;
    }

    public void setIdCitoyen(int idCitoyen) {
        this.idCitoyen = idCitoyen;
    }

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
        return NumTel;
    }

    public void setNum_tel(String num_tel) {
        this.NumTel = num_tel;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getNum_sec() {
        return NumSec;
    }

    public void setNum_sec(String num_sec) {
        this.NumSec = num_sec;
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

    public int getValidation() {
        return validation;
    }

    public void setValidation(int validation) {
        this.validation = validation;
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

    public Date getDateDerniereModif() {
        return dateDerniereModif;
    }

    public void setDateDerniereModif(Date dateDerniereModif) {
        this.dateDerniereModif = dateDerniereModif;
    }

    public Set<DemandeAmi> getDemandes() {
        return demandes;
    }

    public void setDemandes(Set<DemandeAmi> demandes) {
        this.demandes = demandes;
    }

    //Getter et setters


}
