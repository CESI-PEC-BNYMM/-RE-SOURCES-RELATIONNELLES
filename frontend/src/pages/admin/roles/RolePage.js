// Importation des hooks React et des icônes FontAwesome pour l'édition et la suppression
import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
// Importation des composants modaux pour ajouter, mettre à jour, et confirmer les actions
import ModalAddRole from './ModalAddRole';
import ModalUpdateRole from './ModalUpdateRole';
import ModalConfirmation from '../users/ModalConfirmation';
// Importation du contexte d'administration
import { AdminContext } from '../../../utils/adminContext';

// Définition du composant RolePage
const RolePage = () => {
    // Récupération des données et méthodes depuis AdminContext
    const { roles, setMessageNotification, addRole, updateRole, deleteRole } = useContext(AdminContext);

    // États locaux pour la gestion de la visibilité des modaux
    const [showModalAddRole, setShowModalAddRole] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);
    const [editRoleData, setEditRoleData] = useState(null);
    const [idRoleToDelete, setIdRoleToDelete] = useState(null);

    // Fonctions pour ouvrir et fermer le modal d'ajout de rôle
    const handleModalAddRoleOpen = () => setShowModalAddRole(true);
    const handleModalAddRoleClose = () => setShowModalAddRole(false);

    // Fonctions pour ouvrir et fermer le modal de mise à jour de rôle
    const handleModalUpdateRoleOpen = (role) => {
        setEditRoleData(role); // Définit les données du rôle à modifier
        setShowModalUpdateRole(true);
    };
    const handleModalUpdateRoleClose = () => setShowModalUpdateRole(false);

    // Fonctions pour ouvrir et fermer le modal de suppression de rôle
    const handleModalDeleteRoleOpen = (roleId) => {
        setIdRoleToDelete(roleId); // Définit l'ID du rôle à supprimer
        setShowModalDeleteRole(true);
    };
    const handleModalDeleteRoleClose = () => setShowModalDeleteRole(false);

    // Fonction pour confirmer la suppression d'un rôle
    const handleConfirmDeleteRole = () => {
        deleteRole(idRoleToDelete); // Appelle la fonction de suppression du contexte
        setMessageNotification('Rôle supprimé avec succès'); // Affiche une notification de succès
        setShowModalDeleteRole(false); // Ferme le modal de confirmation
    };

    // Rendu du composant
    return (
        <div className="container Content">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <button onClick={handleModalAddRoleOpen} className="btn btn-primary mb-3">Ajouter un rôle</button>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nom</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {roles.map(role => (
                                <tr key={role.id}>
                                    <td>{role.id}</td>
                                    <td>{role.name}</td>
                                    <td>
                                        <FaEdit onClick={() => handleModalUpdateRoleOpen(role)} className="action-icon mr-2 text-primary" />
                                        <FaTrash onClick={() => handleModalDeleteRoleOpen(role.id)} className="action-icon text-danger" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModalAddRole && <ModalAddRole showModal={showModalAddRole} handleModalClose={handleModalAddRoleClose} addRole={addRole} />}
                    {showModalUpdateRole && <ModalUpdateRole roleData={editRoleData} showModal={showModalUpdateRole} handleModalClose={handleModalUpdateRoleClose} updateRole={updateRole} />}
                    {showModalDeleteRole && <ModalConfirmation handleConfirm={handleConfirmDeleteRole} show={showModalDeleteRole} handleModalClose={handleModalDeleteRoleClose} />}
                </div>
            </div>
        </div>
    );
};

// Exportation du composant pour une utilisation dans d'autres parties de l'application
export default RolePage;
