package com.rr.services;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.rr.entity.Publication;
import com.rr.entity.Categorie;
import com.rr.entity.Citoyen;
import com.rr.repository.PublicaitonRepository;

@Service
public class PublicationService{

    @Autowired
    privat PublicaitonRepository publicaitonrepository;

    @Transactional(rollbackFor = Exception.class)
    public String list(String mail){


    }
}