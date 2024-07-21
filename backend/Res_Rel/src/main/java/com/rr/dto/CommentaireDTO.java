package com.rr.dto;

public class CommentaireDTO {

    private int idCommentaire;
    private String tewtCommentaire;
    private boolean commentaireSignale;
    private CitoyenDTO citoyen; // DTO for Citoyen

    // Getters and Setters

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

    public CitoyenDTO getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(CitoyenDTO citoyen) {
        this.citoyen = citoyen;
    }
}
