package com.rr.dto;

import java.util.Date;
import java.util.Set;

public class PublicationDTO {

    private int idPublication;
    private String description;
    private Date datePub;
    private boolean pubValidee;
    private boolean pubSignalee;
    private Integer nbrVues;
    private Set<CategorieDTO> categories; // Assuming CategorieDTO is similarly defined
    private Set<CommentaireDTO> commentaires; // Assuming CommentaireDTO is similarly defined
    private Set<RessourceDTO> ressources; // Assuming RessourceDTO is similarly defined
    private CitoyenDTO citoyen; // DTO for Citoyen

    // Getters and Setters

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
        return datePub;
    }

    public void setDatePub(Date datePub) {
        this.datePub = datePub;
    }

    public boolean isPubValidee() {
        return pubValidee;
    }

    public void setPubValidee(boolean pubValidee) {
        this.pubValidee = pubValidee;
    }

    public boolean isPubSignalee() {
        return pubSignalee;
    }

    public void setPubSignalee(boolean pubSignalee) {
        this.pubSignalee = pubSignalee;
    }

    public Integer getNbrVues() {
        return nbrVues;
    }

    public void setNbrVues(Integer nbrVues) {
        this.nbrVues = nbrVues;
    }

    public Set<CategorieDTO> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategorieDTO> categories) {
        this.categories = categories;
    }

    public Set<CommentaireDTO> getCommentaires() {
        return commentaires;
    }

    public void setCommentaires(Set<CommentaireDTO> commentaires) {
        this.commentaires = commentaires;
    }

    public Set<RessourceDTO> getRessources() {
        return ressources;
    }

    public void setRessources(Set<RessourceDTO> ressources) {
        this.ressources = ressources;
    }

    public CitoyenDTO getCitoyen() {
        return citoyen;
    }

    public void setCitoyen(CitoyenDTO citoyen) {
        this.citoyen = citoyen;
    }
}
