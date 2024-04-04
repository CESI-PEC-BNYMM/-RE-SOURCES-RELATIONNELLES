import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalAddRole from './ModalAddRole';
import ModalUpdateRole from './ModalUpdateRole';
import ModalConfirmation from '../users/ModalConfirmation';
import { AdminContext } from '../../../utils/adminContext';
 

const RolePage = () => {
    const { roles, setMessageNotification, addRole, updateRole, deleteRole } = useContext(AdminContext);
    const [showModalAddRole, setShowModalAddRole] = useState(false);
    const [showModalUpdateRole, setShowModalUpdateRole] = useState(false);
    const [showModalDeleteRole, setShowModalDeleteRole] = useState(false);
    const [editRoleData, setEditRoleData] = useState(null);
    const [idRoleToDelete, setIdRoleToDelete] = useState(null);

    const handleModalAddRoleOpen = () => setShowModalAddRole(true);
    const handleModalAddRoleClose = () => setShowModalAddRole(false);
    
    const handleModalUpdateRoleOpen = (role) => {
        setEditRoleData(role);
        setShowModalUpdateRole(true);
    };
    const handleModalUpdateRoleClose = () => setShowModalUpdateRole(false);

    const handleModalDeleteRoleOpen = (roleId) => {
        setIdRoleToDelete(roleId);
        setShowModalDeleteRole(true);
    };
    const handleModalDeleteRoleClose = () => setShowModalDeleteRole(false);

    const handleConfirmDeleteRole = () => {
        deleteRole(idRoleToDelete); // Supposons que cette fonction appelle le backend
        setMessageNotification('Rôle supprimé avec succès');
        setShowModalDeleteRole(false);
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

export default RolePage;
