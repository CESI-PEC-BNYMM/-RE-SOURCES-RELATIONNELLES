// Importation des hooks et composants nécessaires depuis React et react-bootstrap
import React from 'react';
import { Button, Modal } from 'react-bootstrap';

// Définition du composant fonctionnel ModalConfirmation avec props pour la gestion
function ModalConfirmation({ show, handleModalClose, id, handleConfirm }) {

  // handleConfirme est une fonction qui exécute la logique de confirmation
  // et ferme ensuite la modale
  const handleConfirme = async (userId) => {
    handleConfirm(userId); // Exécute la fonction de confirmation passée en props
    handleModalClose(); // Ferme la modale
  };

  // Rendu du composant modale avec structure conditionnelle basée sur `show`
  return (
    <Modal show={show} onHide={handleModalClose} className='p-3' centered>
      <Modal.Header closeButton className='p-3'>
        <Modal.Title>Confirmation</Modal.Title> {/* Titre de la modale */}
      </Modal.Header>
      <Modal.Body className='p-3'>
        <p>Êtes-vous sûr de vouloir effectuer cette action ?</p> {/* Message de confirmation */}
      </Modal.Body>
      <Modal.Footer className='d-flex justify-content-between p-3'>
        {/* Bouton pour annuler l'action et fermer la modale */}
        <Button variant="secondary" onClick={handleModalClose}>
          Annuler
        </Button>
        {/* Bouton pour confirmer l'action. Utilise `handleConfirme` avec l'ID fourni */}
        <Button variant="danger" onClick={() => handleConfirme(id)}>
          Confirmer
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

// Exportation du composant pour permettre son utilisation dans d'autres parties de l'application
export default ModalConfirmation;
