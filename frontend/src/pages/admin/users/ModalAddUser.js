import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap'; // Composants de Bootstrap pour l'interface utilisateur
import { Formik, Field, ErrorMessage } from 'formik'; // Bibliothèque Formik pour la gestion des formulaires
import * as Yup from 'yup'; // Bibliothèque Yup pour la validation des données du formulaire
import { saveNewUser } from '../../../services/admin/userService'; // Fonction pour enregistrer un nouvel utilisateur
import { AdminContext } from '../../../utils/adminContext'; // Contexte administratif pour les notifications


const ModalAddUser = ({ showModal, handleModalClose }) => {
    const { setMessageNotification } = useContext(AdminContext) // Utilisation du contexte pour les notifications

    const [messageErreur, setMessageErreur] = useState(null); // État local pour gérer les messages d'erreur

    // Gestion du temps d'affichage des messages d'erreur
    useEffect(() => {
        if (messageErreur) {
            const timeout = setTimeout(() => {
                setMessageErreur('');
            }, 3000); // Efface le message d'erreur après 3 secondes

            return () => clearTimeout(timeout); // Nettoyage de l'effet
        }
    }, [messageErreur]);

    // Schéma de validation des champs du formulaire avec Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'), // Validation pour le nom
        email: Yup.string().email('Email invalide').required('L\'email est requis'), // Validation pour l'email
        password: Yup.string()
            .required('Le mot de passe est requis')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
                'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
            ), // Validation complexe pour le mot de passe
    });

    // Gestion de la soumission du formulaire
    const handleSubmit = async (values, { resetForm }) => {
        await saveNewUser(values, resetForm, handleModalClose, setMessageErreur, setMessageNotification);
    };

    // Rendu du composant modal avec Formik pour la gestion du formulaire
    return (
        <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>Ajouter un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                <Formik
                    initialValues={{ name: '', email: '', password: '' }}
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
