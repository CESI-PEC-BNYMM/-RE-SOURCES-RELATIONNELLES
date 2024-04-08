package com.rr.entity;

import jakarta.persistence.*;
import org.hibernate.dialect.function.TruncFunction;
import org.hibernate.type.descriptor.jdbc.TinyIntAsSmallIntJdbcType;

import java.util.Date;

@Entity

public class Publication {
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private int idPublication;
    private Long description;
    private Date DatePub;
    private boolean PubValidee;
    private  boolean PubSignalee;
    private int NbrVues;

    @OneToMany(mappedBy = "Publication")

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
