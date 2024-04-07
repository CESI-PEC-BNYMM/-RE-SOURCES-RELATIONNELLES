// Importation des hooks et des composants nécessaires de React, Bootstrap et Formik
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Importation du contexte administratif et de la fonction pour mettre à jour un utilisateur
import { AdminContext } from '../../../utils/adminContext';
import { updateUser } from '../../../services/admin/userService';

// Déclaration du composant ModalEditUser avec ses props
const ModalEditUser = ({ showModal, userData, handleModalClose }) => {
    // Utilisation du contexte administratif pour accéder aux rôles et à la fonction de notification
    const { roles, setMessageNotification } = useContext(AdminContext)
    // État local pour gérer les messages d'erreur
    const [messageErreur, setMessageErreur] = useState(null);

    // Effet pour effacer les messages d'erreur après 3 secondes
    useEffect(() => {
        if (messageErreur) {
            const timeout = setTimeout(() => {
                setMessageErreur('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [messageErreur]);

    // Schéma de validation pour les champs du formulaire avec Yup
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom est requis'),
        email: Yup.string().email('Email invalide').required('L\'email est requis'),
        roleId: Yup.string().required('Le rôle est requis'),
    });

    // Fonction pour gérer la soumission du formulaire
    const handleSubmit = async (values, { resetForm }) => {
        // Appel à la fonction updateUser avec les valeurs du formulaire
        await updateUser(userData.id, values, resetForm, handleModalClose, setMessageErreur, setMessageNotification);
    };

    // Rendu du composant modale
    return (
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Modifier un utilisateur</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
                {/* Affichage conditionnel du message d'erreur */}
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                {/* Formulaire pour l'édition d'un utilisateur avec Formik */}
                <Formik
                    initialValues={{
                        name: userData ? userData.name : '',
                        email: userData ? userData.email : '',
                        roleId: userData ? userData.roleId : '',
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            {/* Champ pour le nom */}
                            <Form.Group controlId="formName">
                                <Form.Label>Nom</Form.Label>
                                <Field type="text" name="name" as={Form.Control} />
                                <ErrorMessage name="name" component="div" className="text-danger" />
                            </Form.Group>
                            {/* Champ pour l'email */}
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Field type="email" name="email" as={Form.Control} />
                                <ErrorMessage name="email" component="div" className="text-danger" />
                            </Form.Group>
                            {/* Sélecteur pour le rôle */}
                            <Form.Group controlId="formRole">
                                <Form.Label>Rôle</Form.Label>
                                <Field as="select" name="roleId" className="form-select">
                                    {roles.map((role) => (
                                        <option key={role.id} value={role.id}>
                                            {role.name}</option>
                                    ))}
                                </Field>
                                <ErrorMessage name="roleId" component="div" className="text-danger" />
                            </Form.Group>
                            {/* Boutons pour annuler ou confirmer la modification */}
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

// Exportation du composant pour une utilisation ailleurs dans l'application
export default ModalEditUser;
