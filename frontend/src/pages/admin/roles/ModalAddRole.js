// Importation des hooks et composants nécessaires de React, Bootstrap et autres bibliothèques
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Bibliothèque de validation de schémas pour les formulaires
import { AdminContext } from '../../../utils/adminContext'; // Contexte pour l'administration
import { toast } from 'react-toastify'; // Bibliothèque pour afficher des notifications

// Déclaration du composant fonctionnel ModalAddRole avec props pour la gestion de la visibilité et la fermeture
const ModalAddRole = ({ showModal, handleModalClose }) => {
    // Utilisation du contexte pour accéder aux fonctions de gestion des rôles
    const { addRole, setMessageNotification } = useContext(AdminContext);

    // State local pour gérer les messages d'erreur
    const [messageErreur, setMessageErreur] = useState(null);

    // useEffect pour réinitialiser le message d'erreur après 3 secondes
    useEffect(() => {
        if (messageErreur) {
            const timeout = setTimeout(() => {
                setMessageErreur('');
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [messageErreur]);

    // Schéma de validation Yup pour le formulaire
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom du rôle est requis'), // Validation pour le champ "name"
    });

    // Fonction de soumission du formulaire
    const handleSubmit = async (values, { resetForm }) => {
        const response = await addRole(values); // Appel à la fonction addRole du contexte
        if (response.success) {
            toast.success(response.message); // Notification de succès
            resetForm(); // Réinitialisation du formulaire
            handleModalClose(); // Fermeture du modal
            setMessageNotification(response.message); // Mise à jour du message de notification
        } else {
            toast.error(response.message); // Notification d'erreur
            setMessageErreur(response.message); // Mise à jour du message d'erreur local
        }
    };

    // Rendu du composant
    return (
        <Modal show={showModal} onHide={handleModalClose} centered>
            <Modal.Header closeButton className='p-1'>
                <Modal.Title>Ajouter un Rôle</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-1'>
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
                                <Field type="text" name="name" as={Form.Control} />
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

export default ModalAddRole; // Exportation du composant pour utilisation ailleurs dans l'application
