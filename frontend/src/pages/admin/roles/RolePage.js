import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalAddRole from './ModalAddRole';
import ModalUpdateRole from './ModalUpdateRole';
import ModalConfirmation from '../users/ModalConfirmation';
import { AdminContext } from '../../../utils/adminContext';
import { addRole, updateRole, deleteRole } from '../../../services/admin/rolesService';

const RolePage = () => {
    const { roles, setMessageNotification } = useContext(AdminContext);
    const [showModalAddRole, setShowModalAddRole] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);
    const [idRoleToDelete, setIdRoleToDelete] = useState(null);
    const [editRoleData, setEditRoleData] = useState(null);

    useEffect(() => {
        console.log("Roles:", roles); // Ajoutez cette ligne pour voir les données des rôles dans la console
    }, [roles]);

    const handleModalAddRoleOpen = () => setShowModalAddRole(true);
    const handleModalAddRoleClose = () => setShowModalAddRole(false);
    const ModalUpdateRoleOpen = (role) => {
        setEditRoleData(role);
        setShowModalUpdateRole(true);
    };
    const handleModalUpdateRoleClose = () => setShowModalUpdateRole(false);
    const handleModalDeleteRoleOpen = (roleId) => {
        setIdRoleToDelete(roleId);
        setShowModalDeleteRole(true);
    };
    const handleModalDeleteRoleClose = () => setShowModalDeleteRole(false);

    const handleConfirmDeleteRole = (roleId) => {
        // Vous devez implémenter cette fonction dans vos services
        deleteRole(roleId).then(() => {
            setMessageNotification('Rôle supprimé avec succès');
            // Mettre à jour la liste des rôles après la suppression
        }).catch(error => {
            setMessageNotification('Erreur lors de la suppression du rôle');
        });
    };

    return (
        <div className="container">
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
                                        <button onClick={() => ModalUpdateRoleOpen(role)} className="btn btn-secondary btn-sm mr-2">Éditer</button>
                                        <button onClick={() => handleModalDeleteRoleOpen(role.id)} className="btn btn-danger btn-sm">Supprimer</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {showModalAddRole && <ModalAddRole showModal={showModalAddRole} handleModalClose={handleModalAddRoleClose} />}
                    {showModalUpdateRole && <ModalUpdateRole roleData={editRoleData} showModal={showModalUpdateRole} handleModalClose={handleModalUpdateRoleClose} />}
                    {showModalDeleteRole && <ModalConfirmation handleConfirm={handleConfirmDeleteRole} id={idRoleToDelete} show={showModalDeleteRole} handleModalClose={handleModalDeleteRoleClose} />}
                </div>
            </div>
        </div>
    );
};

export default RolePage;
