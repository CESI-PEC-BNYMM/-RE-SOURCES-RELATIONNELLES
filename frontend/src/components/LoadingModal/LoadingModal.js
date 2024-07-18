import React from 'react';
import { Modal } from 'react-bootstrap';

const LoadingModal = ({ show, message }) => {
    return (
        <Modal show={show} centered>
            <Modal.Body>
                <p>{message}</p>
                <div className="d-flex justify-content-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </Modal.Body>
        </Modal>
    );
};

export default LoadingModal;
