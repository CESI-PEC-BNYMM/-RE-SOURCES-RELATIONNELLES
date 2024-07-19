package com.rr.entity;

import jakarta.persistence.*;


@Entity
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "id_commentaire")
    private int idCommentaire;
    @Column(name = "tewt_commentaire")
    private String tewtCommentaire;
    @Column(name="commentaire_signale")
    private boolean commentaireSignale;
    @Column(name = "type")
    private boolean type;

    // relation 1,n avec citoyen
    @ManyToOne
    @JoinColumn(name = "citoyen_mail")
    private Citoyen citoyen; // Référence au citoyen ayant posté le commentaire

    // relation 1,n avec Publication
    @ManyToOne
    @JoinColumn(name = "publication_idpublication")
    private Publication publication;


    public int getIdCommentaire() {
        return idCommentaire;
    }

    public void setIdCommentaire(int idCommentaire) {
        this.idCommentaire = idCommentaire;
    }

    public String getTewtCommentaire() {
        return tewtCommentaire;
    }

    public void setTewtCommentaire(String tewtCommentaire) {
        this.tewtCommentaire = tewtCommentaire;
    }

    public boolean isCommentaireSignale() {
        return commentaireSignale;
    }

    public void setCommentaireSignale(boolean commentaireSignale) {
        this.commentaireSignale = commentaireSignale;
    }

    public boolean isType() {
        return type;
    }

    public void setType(boolean type) {
        this.type = type;
    }
}
