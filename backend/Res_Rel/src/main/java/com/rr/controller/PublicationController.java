package com.rr.controller;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.tomcat.util.file.ConfigurationSource.Resource;
import org.hibernate.mapping.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.rr.ResourceNotFoundException;
import com.rr.dto.CategorieDTO;
import com.rr.dto.CitoyenDTO;
import com.rr.dto.CommentaireDTO;
import com.rr.dto.PublicationDTO;
import com.rr.dto.RessourceDTO;
import com.rr.entity.Categorie;
import com.rr.entity.Citoyen;
import com.rr.entity.DemandeAmi;
import com.rr.entity.Publication;
import com.rr.entity.Ressource;
import com.rr.repository.CategorieRepository;
import com.rr.repository.CitoyenRepository;
import com.rr.repository.PublicationRepository;
import com.rr.repository.RessourceRepository;
import com.rr.services.PublicationService;
import com.rr.utils.JwtUtil;

@Controller
@RestController
@RequestMapping("/publications")

public class PublicationController {
    private final PublicationRepository publicationRepository;
    private final CategorieRepository categorieRepository;
    private final CitoyenRepository citoyenRepository;
    private final RessourceRepository ressourceRepository;

    @Autowired
    public PublicationController(PublicationRepository publicationRepository, CategorieRepository categorieRepository,
            CitoyenRepository citoyenRepository, RessourceRepository ressourceRepository) {
        this.publicationRepository = publicationRepository;
        this.categorieRepository = categorieRepository;
        this.citoyenRepository = citoyenRepository;
        this.ressourceRepository = ressourceRepository;
    }

    /**
     * Retrieves all publications.
     * 
     * @return A list of all publications or an error message.
     * @example GET /publications/list
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list")
    public ResponseEntity<?> getAllPublications() {
        try {
            List<Publication> publications = publicationRepository.findAll();

            // Convert to DTO
            List<PublicationDTO> publicationDTOs = publications.stream().map(pub -> {
                PublicationDTO dto = new PublicationDTO();
                dto.setIdPublication(pub.getIdPublication());
                dto.setDescription(pub.getDescription());
                dto.setDatePub(pub.getDatePub());
                dto.setPubValidee(pub.isPubValidee());
                dto.setPubSignalee(pub.isPubSignalee());
                dto.setNbrVues(pub.getNbrVues());

                // Map categories
                dto.setCategories(pub.getCategories().stream().map(cat -> {
                    CategorieDTO catDto = new CategorieDTO();
                    catDto.setIdCategorie(cat.getIdCategorie());
                    catDto.setLibelle(cat.getLibelle());
                    return catDto;
                }).collect(Collectors.toSet()));

                // Map ressources
                if (pub.getRessource() != null) {
                    RessourceDTO resDto = new RessourceDTO();
                    resDto.setIdRessource(pub.getRessource().getIdRessource());
                    resDto.setLien(pub.getRessource().getLien());
                    dto.setRessources(java.util.Set.of(resDto)); // Wrap in a Set for consistency
                } else {
                    dto.setRessources(java.util.Set.of()); // Handle case where there's no associated resource
                }

                // Map commentaires
                dto.setCommentaires(pub.getCommentaires().stream().map(comment -> {
                    CommentaireDTO comDto = new CommentaireDTO();
                    comDto.setIdCommentaire(comment.getIdCommentaire());
                    comDto.setTewtCommentaire(comment.getTewtCommentaire());
                    comDto.setCommentaireSignale(comment.isCommentaireSignale());

                    // Map citoyen for comment
                    CitoyenDTO citoyenDto = new CitoyenDTO();
                    Citoyen citoyen = comment.getCitoyen();
                    if (citoyen != null) {
                        citoyenDto.setMail(citoyen.getMail());
                        citoyenDto.setNom(citoyen.getNom());
                        citoyenDto.setPrenom(citoyen.getPrenom());
                        citoyenDto.setNumTel(citoyen.getNumTel());
                        citoyenDto.setRole(citoyen.getRole());
                        citoyenDto.setDateNaissance(citoyen.getDateNaissance());
                        citoyenDto.setSexe(citoyen.getSexe());
                        citoyenDto.setActif(citoyen.getActif());
                        citoyenDto.setValidaton(citoyen.getValidaton());
                        citoyenDto.setCodePostal(citoyen.getCodePostal());
                        citoyenDto.setVille(citoyen.getVille());
                        citoyenDto.setDateDerniereConnexion(citoyen.getDateDerniereConnexion());
                    }
                    comDto.setCitoyen(citoyenDto);
                    return comDto;
                }).collect(Collectors.toSet()));

                // Map citoyen
                CitoyenDTO citoyenDto = new CitoyenDTO();
                Citoyen citoyen = pub.getCitoyen();
                if (citoyen != null) {
                    citoyenDto.setMail(citoyen.getMail());
                    citoyenDto.setNom(citoyen.getNom());
                    citoyenDto.setPrenom(citoyen.getPrenom());
                    citoyenDto.setNumTel(citoyen.getNumTel());
                    citoyenDto.setRole(citoyen.getRole());
                    citoyenDto.setDateNaissance(citoyen.getDateNaissance());
                    citoyenDto.setSexe(citoyen.getSexe());
                    citoyenDto.setActif(citoyen.getActif());
                    citoyenDto.setValidaton(citoyen.getValidaton());
                    citoyenDto.setCodePostal(citoyen.getCodePostal());
                    citoyenDto.setVille(citoyen.getVille());
                    citoyenDto.setDateDerniereConnexion(citoyen.getDateDerniereConnexion());
                }
                dto.setCitoyen(citoyenDto);

                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(publicationDTOs);
        } catch (Exception e) {
            System.err.println("Error retrieving publications: " + e.getMessage());
            return ResponseEntity.status(500).body("Error retrieving publications: " + e.getMessage());
        }
    }

    /**
     * Retrieves a publication by the email of a user mail.
     * 
     * @param mail The email of the user.
     * @return A list of publications or an error message.
     * @example GET /list/{mail}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/list/{mail}")
    public ResponseEntity<?> getPublicationsByCitoyenEmail(@PathVariable String mail) {
        try {
            Citoyen citoyen = citoyenRepository.findById(mail)
                    .orElseThrow(() -> new ResourceNotFoundException("Citoyen not found"));
            List<Publication> publications = publicationRepository.findByCitoyen(citoyen);

            // Convert to DTO
            List<PublicationDTO> publicationDTOs = publications.stream().map(pub -> {
                PublicationDTO dto = new PublicationDTO();
                dto.setIdPublication(pub.getIdPublication());
                dto.setDescription(pub.getDescription());
                dto.setDatePub(pub.getDatePub());
                dto.setPubValidee(pub.isPubValidee());
                dto.setPubSignalee(pub.isPubSignalee());
                dto.setNbrVues(pub.getNbrVues());

                // Map categories
                dto.setCategories(pub.getCategories().stream().map(cat -> {
                    CategorieDTO catDto = new CategorieDTO();
                    catDto.setIdCategorie(cat.getIdCategorie());
                    catDto.setLibelle(cat.getLibelle());
                    return catDto;
                }).collect(Collectors.toSet()));

                // Map ressources
                if (pub.getRessource() != null) {
                    RessourceDTO resDto = new RessourceDTO();
                    resDto.setIdRessource(pub.getRessource().getIdRessource());
                    resDto.setLien(pub.getRessource().getLien());
                    dto.setRessources(java.util.Set.of(resDto)); // Wrap in a Set for consistency
                } else {
                    dto.setRessources(java.util.Set.of()); // Handle case where there's no associated resource
                }

                // Map commentaires
                dto.setCommentaires(pub.getCommentaires().stream().map(comment -> {
                    CommentaireDTO comDto = new CommentaireDTO();
                    comDto.setIdCommentaire(comment.getIdCommentaire());
                    comDto.setTewtCommentaire(comment.getTewtCommentaire());
                    comDto.setCommentaireSignale(comment.isCommentaireSignale());

                    // Map citoyen for comment
                    CitoyenDTO citoyenDto = new CitoyenDTO();
                    Citoyen citoyenComment = comment.getCitoyen();
                    if (citoyenComment != null) {
                        citoyenDto.setMail(citoyenComment.getMail());
                        citoyenDto.setNom(citoyenComment.getNom());
                        citoyenDto.setPrenom(citoyenComment.getPrenom());
                        citoyenDto.setNumTel(citoyenComment.getNumTel());
                        citoyenDto.setRole(citoyenComment.getRole());
                        citoyenDto.setDateNaissance(citoyenComment.getDateNaissance());
                        citoyenDto.setSexe(citoyenComment.getSexe());
                        citoyenDto.setActif(citoyenComment.getActif());
                        citoyenDto.setValidaton(citoyenComment.getValidaton());
                        citoyenDto.setCodePostal(citoyenComment.getCodePostal());
                        citoyenDto.setVille(citoyenComment.getVille());
                        citoyenDto.setDateDerniereConnexion(citoyenComment.getDateDerniereConnexion());
                    }
                    comDto.setCitoyen(citoyenDto);
                    return comDto;
                }).collect(Collectors.toSet()));

                // Map citoyen
                CitoyenDTO citoyenDto = new CitoyenDTO();
                Citoyen citoyenPub = pub.getCitoyen();
                if (citoyenPub != null) {
                    citoyenDto.setMail(citoyenPub.getMail());
                    citoyenDto.setNom(citoyenPub.getNom());
                    citoyenDto.setPrenom(citoyenPub.getPrenom());
                    citoyenDto.setNumTel(citoyenPub.getNumTel());
                    citoyenDto.setRole(citoyenPub.getRole());
                    citoyenDto.setDateNaissance(citoyenPub.getDateNaissance());
                    citoyenDto.setSexe(citoyenPub.getSexe());
                    citoyenDto.setActif(citoyenPub.getActif());
                    citoyenDto.setValidaton(citoyenPub.getValidaton());
                    citoyenDto.setCodePostal(citoyenPub.getCodePostal());
                    citoyenDto.setVille(citoyenPub.getVille());
                    citoyenDto.setDateDerniereConnexion(citoyenPub.getDateDerniereConnexion());
                }
                dto.setCitoyen(citoyenDto);

                return dto;
            }).collect(Collectors.toList());

            return ResponseEntity.ok(publicationDTOs);
        } catch (Exception e) {
            System.err.println("Error retrieving publications by email: " + e.getMessage());
            return ResponseEntity.status(500).body("Error retrieving publications by email");
        }
    }

    /**
     * Deletes a publication.
     * 
     * @param token         The authentication token of the user.
     * @param idPublication The ID of the publication to delete.
     * @return A response indicating the success or failure of the operation.
     * @example DELETE /publications/delete/{id}
     * @header "Authorization": "Bearer token"
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/delete/{idPublication}")
    public ResponseEntity<?> deletePublication(@RequestHeader("Authorization") String token,
            @PathVariable int idPublication) {
        try {
            String emailUser = JwtUtil.getEmailFromToken(token);
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            // Find the publication by ID
            Publication publication = publicationRepository.findById(idPublication)
                    .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));

            // Check authorization
            if (!publication.getCitoyen().getMail().equals(emailUser)) {
                return ResponseEntity.badRequest().body("Not authorized to delete this publication");
            }

            // Remove comments manually if necessary, for instance:
            // publication.getCommentaires().clear();

            // Delete the publication
            publicationRepository.delete(publication);

            return ResponseEntity.ok().body("Publication deleted successfully");

        } catch (Exception e) {
            System.err.println("Error deleting publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error deleting publication: " + e.getMessage());
        }
    }

    /**
     * Reports a publication.
     * 
     * @param idPublication The ID of the publication to report.
     * @return A response indicating the success of the operation.
     * @example POST /publications/report/{id}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/report/{idPublication}")
    public ResponseEntity<?> reportPublication(@PathVariable int idPublication) {
        try {
            PublicationService publicationService = new PublicationService(publicationRepository);
            publicationService.reportPublication(idPublication);
            return ResponseEntity.ok().body("Publication reported successfully");
        } catch (Exception e) {
            System.err.println("Error reporting publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error reporting publication" + e.getMessage());
        }
    }

    /**
     * Validates a publication.
     * 
     * @param idPublication The ID of the publication to validate.
     * @return A response indicating the success of the operation.
     * @example POST /publications/validate_publi/{idPublication}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/validate_publi/{idPublication}")
    public ResponseEntity<?> validatePublication(@PathVariable int idPublication) {
        try {
            PublicationService publicationService = new PublicationService(publicationRepository);
            publicationService.validatePublication(idPublication);
            return ResponseEntity.ok().body("Publication validated successfully");
        } catch (Exception e) {
            System.err.println("Error validating publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error validating publication" + e.getMessage());
        }
    }

    /**
     * Increase the number of views of a publication.
     * 
     * @param idPublication The ID of the publication to validate.
     * @return A response indicating the success of the operation.
     * @example POST /publications/increase_views/{idPublication}
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/increase_views/{idPublication}")
    public ResponseEntity<?> increaseViews(@PathVariable int idPublication) {
        try {
            Publication publication = publicationRepository.findById(idPublication)
                    .orElseThrow(() -> new ResourceNotFoundException("Publication not found"));
            var nbr_vues = publication.getNbrVues();
            if (nbr_vues == null) {
                publication.setNbrVues(1);
            } else {
                publication.setNbrVues(nbr_vues + 1);
            }
            publicationRepository.save(publication);
            return ResponseEntity.ok().body("Views increased successfully");
        } catch (Exception e) {
            System.err.println("Error increasing views: " + e.getMessage());
            return ResponseEntity.status(500).body("Error increasing views" + e.getMessage());
        }
    }

    /**
     * Publish a publication.
     * 
     * @param description The description of the publication.
     * @param categories  The categories of the publication.
     * @param token       The authentication token of the user.
     * @param lien        The link of the publication.
     * @return A response indicating the success of the operation.
     * @example POST
     *          /publications/publish?description=description&categories=1&lien=lien
     * @header "Authorization": "Bearer token"
     */
    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/publish")
    public ResponseEntity<?> publishPublication(
            @RequestParam String description,
            @RequestParam List<Integer> categories,
            @RequestHeader("Authorization") String token,
            @RequestParam String lien) {
        try {
            String emailUser = JwtUtil.getEmailFromToken(token);
            if (!JwtUtil.validateToken(token)) {
                return ResponseEntity.badRequest().body("Invalid token");
            }

            Optional<Citoyen> optionalCitoyen = citoyenRepository.findById(emailUser);
            if (!optionalCitoyen.isPresent()) {
                return ResponseEntity.badRequest().body("User not found");
            }

            Citoyen citoyen = optionalCitoyen.get();

            Publication publication = new Publication();
            publication.setDescription(description);
            publication.setDatePub(new Date(System.currentTimeMillis()));
            publication.setPubValidee(false); // Default value
            publication.setPubSignalee(false); // Default value
            publication.setNbrVues(0); // Default value
            publication.setCitoyen(citoyen);

            // Handle categories
            java.util.Set<Categorie> categoriesSet = new HashSet<>();
            for (Integer categoryId : categories) {
                Optional<Categorie> optionalCategorie = categorieRepository.findById(categoryId);
                if (optionalCategorie.isPresent()) {
                    categoriesSet.add(optionalCategorie.get());
                }
            }
            publication.setCategories(categoriesSet);

            // Handle Ressource
            Ressource ressource = new Ressource();
            ressource.setLien(lien);
            ressource.setPublication(publication);
            publication.setRessource(ressource);

            // Save publication and ressource
            publicationRepository.save(publication);
            ressourceRepository.save(ressource);

            return ResponseEntity.ok().body("Publication published successfully");
        } catch (Exception e) {
            System.err.println("Error publishing publication: " + e.getMessage());
            return ResponseEntity.status(500).body("Error publishing publication: " + e.getMessage());
        }
    }

    /*
     * 
     * @GetMapping("/api/publications/{email}")
     * public ResponseEntity<List<Publication>>
     * getPublicationsByCitoyenEmail(@PathVariable String email) {
     * try {
     * Citoyen citoyen = citoyenService.findbymail(email);
     * if (citoyen == null) {
     * return ResponseEntity.notFound().build();
     * }
     * List<Publication> publications =
     * publicationService.getPublicationsByCitoyen(citoyen);
     * return ResponseEntity.ok(publications);
     * } catch (Exception e) {
     * System.err.println("Error retrieving publications by email: " +
     * e.getMessage());
     * return
     * ResponseEntity.status(500).body("Error retrieving publications by email");
     * }
     * }
     */
}