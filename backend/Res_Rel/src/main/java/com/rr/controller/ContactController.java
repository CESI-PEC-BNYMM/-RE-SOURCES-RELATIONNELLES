package com.rr.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

import com.rr.entity.Citoyen;
import com.rr.repository.CitoyenRepository;

import java.util.Optional;

@Controller
public class ContactController {

    @Autowired
    private CitoyenRepository citoyenRepository;

    /**
     * Handles requests to the /contact endpoint. Retrieves the authenticated user's information
     * and adds it to the model.
     *
     * @param model The model to which the user information will be added.
     * @return The name of the view template to be rendered.
     * @example GET /contact
     * Response: Renders the "contact" view with the user's information or an error message.
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/contact")
    public String contact(Model model) {
        try {
            // Get the current authenticated user's email
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String mail = authentication.getName();

            // Retrieve the Citoyen entity based on the email
            Optional<Citoyen> citoyenOptional = citoyenRepository.findByMail(mail);
            if (citoyenOptional.isPresent()) {
                model.addAttribute("nom", citoyenOptional.get());
            } else {
                model.addAttribute("error", "User not found");
            }

            // Return the view name
            return "contact";
        } catch (Exception e) {
            System.err.println("Error retrieving user information: " + e.getMessage());
            model.addAttribute("error", "An error occurred while retrieving user information" + e.getMessage());
            return "contact"; // Return the view name with an error message
        }
    }
}