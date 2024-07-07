import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { AdminContext } from '../../../utils/adminContext';

const ModalAddUser = ({ showModal, handleModalClose }) => {
    const { setMessageNotification, roles } = useContext(AdminContext);
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
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        password: Yup.string()
            .required('Le mot de passe est requis')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
                'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
            ),
        roleId: Yup.string().required('Le rôle est requis'),
    });

    const handleSubmit = async (values, { resetForm }) => {
        console.log('Submitting values:', values); // Debugging line
        const response = await saveNewUser(values);
        if (response.success) {
            setMessageNotification('Utilisateur ajouté avec succès');
            handleModalClose();
            resetForm();
        } else {
            console.log('Error response:', response); // Debugging line
            setMessageErreur(response.message || 'Erreur lors de l\'ajout de l\'utilisateur');
        }
    };

    return (
        <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>Ajouter un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                <Formik
                    initialValues={{ name: '', email: '', password: '', roleId: '' }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Group controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Field type="text" name="name" as={Form.Control} />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Field type="email" name="email" as={Form.Control} />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formPassword">
                                <Form.Label>Mot de passe</Form.Label>
                                <Field type="password" name="password" as={Form.Control} />
                                <ErrorMessage name="password" component="div" className="text-danger" />
                            </Form.Group>
                            <Form.Group controlId="formRole">
                                <Form.Label>Rôle</Form.Label>
                                <Field as="select" name="roleId" className="form-select">
                                    <option value="">Sélectionner un rôle</option>
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}
                                        </option>
                                    ))}
                                    <option value="superadministrateur">Superadministrateur</option>
                                    <option value="modérateur">Modérateur</option>
                                </Field>
                                <ErrorMessage name="roleId" component="div" className="text-danger" />
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

export default ModalAddUser;
