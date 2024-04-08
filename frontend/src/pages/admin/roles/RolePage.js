// Importation des hooks React et des icônes FontAwesome pour l'édition et la suppression
import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
// Importation des composants modaux pour ajouter, mettre à jour, et confirmer les actions
import ModalAddRole from './ModalAddRole';
import ModalUpdateRole from './ModalUpdateRole';
import ModalConfirmation from '../users/ModalConfirmation';
// Importation du contexte d'administration
import { AdminContext } from '../../../utils/adminContext';
import TableTemplate from '../../../components/TableTemplate/TableTemplate';

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

    const header = [
        {
            "key": "id",
            "label": "ID",
            "edit": false,
        },
        {
            "key": "name",
            "label": "Nom rôle",
            "edit": true,
            "required": true
        },
        {
            "key": "action",
            "label": "Action",
            "edit": false,
            "render": (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalUpdateRoleOpen(row)}  className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                    <button onClick={() => handleModalDeleteRoleOpen(row.id)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                </div>
            )
        }
    ];
    const [isLoading, setIsLoading] = useState(false);

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

    console.log("roles", roles); // Affiche les rôles dans la console

    // Rendu du composant
    return (
        <div className="Content">
            <h4>Administration : Gestion des rôles</h4>
            <div className='whiteBox gap-4'>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h5>Liste des rôles</h5>
                    <button className="btn btn-outline-primary" onClick={handleModalAddRoleOpen}>
                        Ajouter un rôle
                    </button>
                </div>
                <div className="d-flex justify-content-end w-100">
                    <small>{roles.length} rôles trouvés</small>
                </div>
                <TableTemplate
                    theadData={header}
                    tbodyData={roles}
                    isLoading={isLoading}
                />
                {showModalAddRole && <ModalAddRole showModal={showModalAddRole} handleModalClose={handleModalAddRoleClose} addRole={addRole} />}
                {showModalUpdateRole && <ModalUpdateRole roleData={editRoleData} showModal={showModalUpdateRole} handleModalClose={handleModalUpdateRoleClose} updateRole={updateRole} />}
                {showModalDeleteRole && <ModalConfirmation handleConfirm={handleConfirmDeleteRole} show={showModalDeleteRole} handleModalClose={handleModalDeleteRoleClose} />}
            </div>
        </div>
    );
};

// Exportation du composant pour une utilisation dans d'autres parties de l'application
export default RolePage;
