import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from '../../../utils/adminContext';
import { toast } from 'react-toastify';

const ModalAddRole = ({ showModal, handleModalClose }) => {
    const { addRole, setMessageNotification } = useContext(AdminContext);
    const [messageErreur, setMessageErreur] = useState(null);

    useEffect(() => {
        if (messageErreur) {
            const timeout = setTimeout(() => {
                setMessageErreur('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [messageErreur]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom du rôle est requis'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        const response = await addRole(values);
        if (response.success) {
            toast.success(response.message);
            resetForm();
            handleModalClose();
            setMessageNotification(response.message);
        } else {
            toast.error(response.message);
            setMessageErreur(response.message);
        }
    };

    return (
        <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>Ajouter un Rôle</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                <Formik
                    initialValues={{ name: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formRole">
                                <Form.Label>Nom du Rôle</Form.Label>
                                <Field as="select" name="name" className="form-control">
                                    <option value="">Sélectionner un rôle</option>
                                    <option value="superadministrateur">Superadministrateur</option>
                                    <option value="administrateur">Administrateur</option>
                                    <option value="modérateur">Modérateur</option>
                                    <option value="citoyen">Citoyen</option>
                                </Field>
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>
                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                <Button variant="secondary" onClick={handleModalClose}>Annuler</Button>
                                <Button variant="primary" type="submit">Enregistrer</Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Modal.Body>
        </Modal>
    );
}

export default ModalAddRole;
