import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onHide, onDelete, id, entityName, masculine = true,rowTitle }) => {
    const handleDelete = () => {
        onDelete(id);
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirmer la suppression</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Êtes-vous sûr de vouloir supprimer {masculine ? 'le' : 'la'} {entityName} {rowTitle} ?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Annuler
                </Button>
                <Button variant="danger" onClick={handleDelete}>
                    Supprimer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
