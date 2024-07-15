package com.rr.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity

public class Publication {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int idPublication;
    private Long description;

    @Column(name = "date_pub")
    private Date datePub;

    private boolean PubValidee;
    private  boolean PubSignalee;
    private int NbrVues;

    //relation avec la table catégorie de type N,M (une pub peyt avoir plusieurs catégorie et une catégorie peut avoir plueireus publication
    @ManyToMany
    @JoinTable(name = "categorie_publication",
            joinColumns = @JoinColumn(name = "publication_id"),
            inverseJoinColumns = @JoinColumn(name = "categorie_id"))
    private Set<Categorie> categories = new HashSet<>();

    @OneToMany(mappedBy = "publication")
    private Set<Commentaire> commentaires; // Liste des commentaires associés à la publication


    // relation avec la table citoyen où publication contient la clé étrangère de citoyen
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citoyen_id") // This column in DemandeAmi table will store the foreign key
    private Citoyen citoyen;



    public String getCitoyenEmail(){return citoyen.getMail();}

    public int getIdPublication() {
        return idPublication;
    }

    public void setIdPublication(int idPublication) {
        this.idPublication = idPublication;
    }

    public Long getDescription() {
        return description;
    }

    public void setDescription(Long description) {
        this.description = description;
    }

    public Date getDatePub() {
        return datePub;
    }

    public void setDatePub(Date datePub) {
        this.datePub = datePub;
    }

    public boolean isPubValidee() {
        return PubValidee;
    }

    public void setPubValidee(boolean pubValidee) {
        PubValidee = pubValidee;
    }

    public boolean isPubSignalee() {
        return PubSignalee;
    }

    public void setPubSignalee(boolean pubSignalee) {
        PubSignalee = pubSignalee;
    }

    public int getNbrVues() {
        return NbrVues;
    }

    public void setNbrVues(int nbrVues) {
        NbrVues = nbrVues;
    }
}
