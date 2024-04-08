package com.rr.entity;

import jakarta.persistence.*;


@Entity
public class Commentaire {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    private int idCommentaire;
    private String tewtCommentaire;
    private boolean commentaireSignale;
    private boolean type;

    @OneToMany(mappedBy = "Commentaire")

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
