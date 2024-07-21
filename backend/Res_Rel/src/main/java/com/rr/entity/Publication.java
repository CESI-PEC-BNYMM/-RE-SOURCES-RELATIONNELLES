package com.rr.entity;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.CascadeType;
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
import jakarta.persistence.OneToOne;

@Entity
public class Publication {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idpublication")
    private int idPublication;

    @Column(name = "description")
    private String description;

    @Column(name = "date_pub")
    private Date datePub;

    @Column(name = "pub_validee")
    private boolean PubValidee;

    @Column(name = "pub_signalee")
    private boolean PubSignalee;

    @Column(name = "nbr_vues")
    private Integer NbrVues;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "pub_cat",
            joinColumns = @JoinColumn(name = "publication_idpublication"),
            inverseJoinColumns = @JoinColumn(name = "categorie_idcategorie"))
    private Set<Categorie> categories = new HashSet<>();

    @OneToMany(mappedBy = "publication", orphanRemoval = true, cascade = CascadeType.ALL)
    private Set<Commentaire> commentaires = new HashSet<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "citoyen_mail")
    private Citoyen citoyen;

    @OneToOne(mappedBy = "publication", orphanRemoval = true, cascade = CascadeType.ALL)
    private Ressource ressource;

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

    public Set<Categorie> getCategories() {
        return categories;
    }

    public void setCategories(Set<Categorie> categories) {
        this.categories = categories;
    }

    public Set<Commentaire> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(Set<Commentaire> commentaires) {
        this.commentaires = commentaires;
    }

    public Citoyen getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(Citoyen citoyen) {
        this.citoyen = citoyen;
    }

    public Ressource getRessource() {
        return ressource;
    }

    public void setRessource(Ressource ressource) {
        this.ressource = ressource;
    }
}
