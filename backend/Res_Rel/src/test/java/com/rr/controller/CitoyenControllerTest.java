package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.repository.CitoyenRepository;

@SpringBootTest

public class CitoyenControllerTest {

    
    @Autowired
    private CitoyenController citoyenController;

    @Autowired
    private CitoyenRepository citoyenRepository;

 
    public void test() {
        
    }
    
}
