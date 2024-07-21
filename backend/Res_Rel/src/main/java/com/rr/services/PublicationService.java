package com.rr.services;

import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.rr.entity.Citoyen;
import com.rr.entity.Publication;
import com.rr.repository.PublicationRepository;

@Service
public class PublicationService {

    private final PublicationRepository publicationRepository;

    @Autowired
    public PublicationService(PublicationRepository publicationRepository) {
        this.publicationRepository = publicationRepository;
    }

    /*
     * public List<Publication> findAll() {
     * return publicationRepository.findAll();
     * }
     */

    /**
     * Retrieves a list of publications associated with a given citizen.
     * 
     * @param citoyen The citizen for which to retrieve publications.
     * @return A list of publications associated with the given citizen.
     */
    public List<Publication> findByCitoyen(Citoyen citoyen) {
        // Find publications in the repository associated with the given citizen.
        return publicationRepository.findByCitoyen(citoyen);
    }

    /**
     * Deletes a publication with the given ID.
     * 
     * @param idPublication The ID of the publication to delete.
     */
    public void deletePublication(int idPublication) {
        // Delete the publication with the given ID from the repository.
        publicationRepository.deleteById(idPublication);
    }

    /**
     * Reports a publication with the given ID by setting its `pubSignalee` field to
     * true
     * and saving the updated publication to the repository.
     *
     * @param idPublication The ID of the publication to report.
     * @return The updated publication.
     * @throws IllegalArgumentException If no publication with the given ID exists.
     */
    public Publication reportPublication(Integer idPublication) {
        // Find the publication with the given ID in the repository.
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();

        // Set the `pubSignalee` field of the publication to true.
        publication.setPubSignalee(true);

        // Save the updated publication to the repository.
        return publicationRepository.save(publication);
    }

    /**
     * Validates a publication with the given ID by setting its `pubValidee` field
     * to true,
     * updating its publication date to the current date, and saving the updated
     * publication
     * to the repository.
     * 
     * @param idPublication The ID of the publication to validate.
     * @throws IllegalArgumentException If no publication with the given ID exists.
     */
    public void validatePublication(Integer idPublication) {
        // Find the publication with the given ID in the repository or throw if not
        // found.
        Publication publication = publicationRepository.findById(idPublication).orElseThrow();

        // Set the publication as validated.
        publication.setPubValidee(true);

        // Update the publication date to the current date.
        publication.setDatePub(new Date());

        // Save the updated publication to the repository.
        publicationRepository.save(publication);
    }

    /**
     * Finds a publication by its ID.
     * 
     * @param idPublication The ID of the publication to find.
     * @return An optional containing the publication if it exists, or an empty
     *         optional if it does not.
     */
    public Optional<Publication> findById(int idPublication) {
        // Find the publication with the given ID in the repository.
        // Returns an optional containing the publication if it exists, or an empty
        // optional if it does not.
        return publicationRepository.findById(idPublication);
    }
}