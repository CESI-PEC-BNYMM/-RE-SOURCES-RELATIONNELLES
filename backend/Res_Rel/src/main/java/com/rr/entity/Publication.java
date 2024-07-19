package com.rr.entity;

import jakarta.persistence.*;
import org.hibernate.dialect.function.TruncFunction;
import org.hibernate.type.descriptor.jdbc.TinyIntAsSmallIntJdbcType;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Entity

public class Publication {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    @Column(name = "id_publication")
    private int idPublication;
    @Column(name = "description")
    private Long description;
<<<<<<< Updated upstream
    private Date DatePub;
=======

    @Column(name = "date_pub")
    private Date datePub;

    @Column(name = "pub_validee")
>>>>>>> Stashed changes
    private boolean PubValidee;
    @Column(name = "pub_signalee")
    private  boolean PubSignalee;
    @Column(name = "nbr_vues")
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
        return DatePub;
    }

    public void setDatePub(Date datePub) {
        DatePub = datePub;
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
