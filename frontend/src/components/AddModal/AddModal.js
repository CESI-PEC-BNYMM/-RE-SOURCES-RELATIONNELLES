import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddModal = ({ show, onHide, theadData, onSave, entityName, masculine = true }) => {
    const [formData, setFormData] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        const isValid = theadData.every(col => {
            if (col.required && !formData[col.key]?.trim()) {
                alert(`Veuillez remplir le champ obligatoire: ${col.label}`);
                return false;
            }
            return true;
        });

        if (isValid) {
            onSave(formData);
        }
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter {masculine ? 'un' : 'une'} {entityName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {theadData.filter(col => col.edit).map((col) => (
                        <Form.Group controlId={`form${col.key}`} key={col.key}>
                            <Form.Label>{col.label} {col.required && <span className="text-danger">*</span>}</Form.Label>
                            {col.type === 'select' ? (
                                <Form.Control
                                    as="select"
                                    name={col.key}
                                    value={formData[col.key] || ''}
                                    onChange={handleChange}
                                    required={col.required}
                                    style={{ marginBottom: '1rem' }}
                                >
                                    <option value="" disabled>Sélectionner...</option>
                                    {col.options.map((option, idx) => (
                                        <option key={idx} value={option}>{option}</option>
                                    ))}
                                </Form.Control>
                            ) : (
                                <Form.Control
                                    type="text"
                                    name={col.key}
                                    value={formData[col.key] || ''}
                                    onChange={handleChange}
                                    required={col.required}
                                    style={{ marginBottom: '1rem' }}
                                />
                            )}
                        </Form.Group>
                    ))}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Annuler
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Enregistrer
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default AddModal;
