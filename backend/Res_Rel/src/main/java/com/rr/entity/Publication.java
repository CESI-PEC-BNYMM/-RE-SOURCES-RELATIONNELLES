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
    @Column(name = "idpublication")
    private int idPublication;
    @Column(name = "description")
    private String description;
    @Column(name = "date_pub")
    private Date datePub;
    @Column(name = "pub_validee")
    private boolean PubValidee;
    @Column(name = "pub_signalee")
    private  boolean PubSignalee;
    @Column(name = "nbr_vues")
    private Integer NbrVues;

    //relation avec la table catégorie de type N,M (une pub peyt avoir plusieurs catégorie et une catégorie peut avoir plueireus publication
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pub_cat",
            joinColumns = @JoinColumn(name = "publication_idpublication"),
            inverseJoinColumns = @JoinColumn(name = "categorie_idcategorie"))
    private Set<Categorie> categories = new HashSet<>();

    @OneToMany(mappedBy = "publication")
    private Set<Commentaire> commentaires; // Liste des commentaires associés à la publication

    // relation avec la table citoyen où publication contient la clé étrangère de citoyen
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citoyen_mail") // This column in DemandeAmi table will store the foreign key
    private Citoyen citoyen;



    public String getCitoyenEmail(){return citoyen.getMail();}

    public int getIdPublication() {
        return idPublication;
    }

    public void setIdPublication(int idPublication) {
        this.idPublication = idPublication;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getDatePub() {
        return this.datePub;
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

    public Integer getNbrVues() {
        return NbrVues;
    }

    public void setNbrVues(Integer nbrVues) {
        NbrVues = nbrVues;
    }
}
