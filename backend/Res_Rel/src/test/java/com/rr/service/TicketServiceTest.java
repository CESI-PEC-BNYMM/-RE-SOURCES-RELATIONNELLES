package com.rr.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.rr.entity.Citoyen;
import com.rr.entity.Ticket;
import com.rr.repository.CitoyenRepository;
import com.rr.repository.TicketRepository;
import com.rr.services.TicketService;

@SpringBootTest
class TicketServiceTest {

    @Mock
    private TicketRepository ticketRepository;

    @Autowired
    private TicketRepository TicketRepository;

    @Mock
    private CitoyenRepository citoyenRepository;

    @InjectMocks
    private TicketService ticketService;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Test to find a ticket by ID when it exists.
     */
    @Test
    void testFindTicketById_Exists() {
        // Create a mock TicketRepository
        TicketRepository ticketRepository = Mockito.mock(TicketRepository.class);
        // Create a TicketService instance
        TicketService ticketService = new TicketService(ticketRepository);

        // Create a mock Ticket object
        Ticket mockTicket = new Ticket(1, "Sample Ticket", "Sample Description", false, "joe", "Dylan",
                "test@mail.com");
        // Mock behavior when findById is called with ID 1
        Mockito.when(ticketRepository.findById(1)).thenReturn(java.util.Optional.of(mockTicket));

        // Retrieve the ticket with ID 1 using the service
        Ticket foundTicket = ticketService.findByIdTicket(1);
        // Check if the found ticket is equal to the mock ticket
        assertEquals(mockTicket, foundTicket);
    }

    /**
     * Test to find a ticket by ID when it does not exist.
     */
    @Test
    void testFindTicketById_NotExists() {
        // Create a mock TicketRepository
        TicketRepository ticketRepository = Mockito.mock(TicketRepository.class);
        // Create a TicketService instance
        TicketService ticketService = new TicketService(ticketRepository);

        // Mock behavior when findById is called with ID 2
        Mockito.when(ticketRepository.findById(2)).thenReturn(java.util.Optional.empty());

        // Verify that calling findByIdTicket with ID 2 throws a RuntimeException
        assertThrows(RuntimeException.class, () -> ticketService.findByIdTicket(2));
    }

    // /**
    //  * Test Add Ticket when it exists.
    //  */
    // @Test
    // void testAjouterTicket_NoCitoyenFound() throws Exception {
    //     // Setup
    //     // Create test data for the ticket
    //     String objet = "Test objet";
    //     String description = "Test description";
    //     boolean etat = true;
    //     String nomCreateur = "John";
    //     String prenomCreateur = "Doe";
    //     String citoyenMail = "nonexistent@example.com";

    //     // Mock the behavior of the CitoyenRepository to return false when existsById is
    //     // called with the test citoyenMail
    //     when(citoyenRepository.existsById(citoyenMail)).thenReturn(false);

    //     // Execute the test by calling the ajouterTicket method with the test data
    //     // Assert that an Error is thrown when calling ajouterTicket with the test data
    //     assertThrows(Error.class,
    //             () -> ticketService.ajouterTicket(objet, description, etat, nomCreateur, prenomCreateur, citoyenMail));
    // }

//     @Test
// void testModifierTicket_Success() {
//     // Setup
//     int idticket = 1;
//     String description = "New description";
//     String objet = "New objet";
//     boolean etat = true;
//     String nomCreateur = "John";
//     String prenomCreateur = "Doe";
//     String mail_createur = "johndoe@example.com";
//     Citoyen citoyen = new Citoyen();
//     citoyen.setMail(mail_createur);
//     Ticket existingTicket = new Ticket();
//     existingTicket.setIdticket(idticket);
//     existingTicket.setDescription("Old description");
//     existingTicket.setObjet("Old objet");
//     existingTicket.setEtat(false);
//     existingTicket.setNomCreateur("Old nom");
//     existingTicket.setPrenomCreateur("Old prenom");
//     existingTicket.setCitoyen(citoyen);
//     when(citoyenRepository.existsById(mail_createur)).thenReturn(true);
//     when(citoyenRepository.findByMail(mail_createur)).thenReturn(Optional.of(citoyen));
//     when(ticketRepository.findById(idticket)).thenReturn(Optional.of(existingTicket));
//     when(ticketRepository.save(existingTicket)).thenReturn(existingTicket);

//     // Execute
//     Ticket result = ticketService.modifierTicket(idticket, description, objet, etat, nomCreateur, prenomCreateur,
//             mail_createur);

//     // Verify
//     assertNotNull(result);
//     assertEquals(description, result.getDescription());
//     assertEquals(objet, result.getObjet());
//     assertEquals(etat, result.isEtat());
//     assertEquals(nomCreateur, result.getNomCreateur());
//     assertEquals(prenomCreateur, result.getPrenomCreateur());
//     assertEquals(citoyen, result.getCitoyen());
// }


    

    /**
     * Test to Modify a Ticket when it exists.
     */
    @Test
    void testModifierTicket_NoCitoyenFound() throws Exception {
        // Setup
        int idticket = 1;
        String description = "New description";
        String objet = "New objet";
        boolean etat = true;
        String nomCreateur = "John";
        String prenomCreateur = "Doe";
        String mail_createur = "nonexistent@example.com";
    
        // Mock citoyenRepository to return false when existsById is called with mail_createur
        when(citoyenRepository.existsById(mail_createur)).thenReturn(false);
    
        // Execute & Verify
        assertThrows(Exception.class, () -> ticketService.modifierTicket(idticket, description, objet, etat,
                nomCreateur, prenomCreateur, mail_createur));
    }
    
    // Test for deleting a ticket
    @Test
    void testSupprimerTicket() {
        int idTicket = 1;
        ticketService.supprimerTicket(idTicket);
        verify(ticketRepository, times(1)).deleteById(idTicket);
    }

}
