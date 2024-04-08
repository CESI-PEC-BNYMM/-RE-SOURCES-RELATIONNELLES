// Importation des hooks et composants nécessaires de React et Bootstrap
import React, { useContext, useEffect, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
// Importation de Formik pour la gestion des formulaires et Yup pour la validation
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
// Importation du contexte d'administration et des services de gestion des rôles
import { AdminContext } from '../../../utils/adminContext';
import { addRole, updateRole } from '../../../services/admin/rolesService';
// Importation de react-toastify pour les notifications
import { toast } from 'react-toastify';

// Déclaration du composant fonctionnel ModalEditRole avec ses props
const ModalEditRole = ({ showModal, roleData, handleModalClose }) => {
    // Utilisation du contexte Admin pour accéder aux fonctions et au message de notification
    const { setMessageNotification, messageNotification } = useContext(AdminContext);
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

    // Schéma de validation Yup pour le formulaire, vérifiant que le champ 'name' est rempli
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Le nom du rôle est requis'),
    });

    // Fonction de soumission du formulaire qui appelle updateRole pour mettre à jour un rôle
    const handleSubmit = async (values, { resetForm }) => {
        const response = await updateRole(roleData.id, values);
        if (response.success) {
            toast.success(response.message); // Affichage d'une notification de succès
            resetForm(); // Réinitialisation du formulaire
            handleModalClose(); // Fermeture du modal
            setMessageNotification(response.message); // Mise à jour du message de notification
        } else {
            toast.error(response.message); // Affichage d'une notification d'erreur
        }
    };

    // Rendu du composant Modal avec Formik pour le formulaire
    return (
        <Modal show={showModal} onHide={handleModalClose}>
            <Modal.Header closeButton className='p-3'>
                <Modal.Title>Modifier un Rôle</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-3'>
                {messageErreur && <p className="text-danger">{messageErreur}</p>}
                <Formik
                    initialValues={{ name: roleData ? roleData.name : '' }} // Initialisation des valeurs du formulaire avec les données du rôle
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

// Exportation du composant pour être utilisé ailleurs dans l'application
export default ModalEditRole;
