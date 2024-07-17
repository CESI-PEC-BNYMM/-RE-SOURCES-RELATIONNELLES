import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const SuccessModal = ({ show, onHide, title, message, details }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                <small>{details}</small>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={onHide}>Fermer</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
