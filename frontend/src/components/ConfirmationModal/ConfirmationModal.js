import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmationModal = ({ show, onHide, title, message, details, onConfirm, confirmText, cancelText, confirmVariant }) => {
    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
                {details && <small>{details}</small>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>{cancelText || 'Annuler'}</Button>
                <Button variant={confirmVariant || 'primary'} onClick={onConfirm}>{confirmText || 'Confirmer'}</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmationModal;
