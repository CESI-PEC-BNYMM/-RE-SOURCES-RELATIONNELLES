package com.rr.dto;

public class DemandeAmiDTO {
    private int idDemandeAmi;
    private Boolean demandeValidee;
    private String nom;
    private String prenom;

    // Constructors, Getters, and Setters

    public DemandeAmiDTO() {}

    public DemandeAmiDTO(int idDemandeAmi, Boolean demandeValidee, String nom, String prenom) {
        this.idDemandeAmi = idDemandeAmi;
        this.demandeValidee = demandeValidee;
        this.nom = nom;
        this.prenom = prenom;
    }

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
}
