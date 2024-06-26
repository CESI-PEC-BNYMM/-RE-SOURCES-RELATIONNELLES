import React, { useState, useContext } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ModalAddRole from './ModalAddRole';
import ModalEditRole from './ModalUpdateRole';
import ModalConfirmation from '../users/ModalConfirmation';
import { AdminContext } from '../../../utils/adminContext';
import TableTemplate from '../../../components/TableTemplate/TableTemplate';

const RolePage = () => {
    const { roles, setMessageNotification, addRole, updateRole, deleteRole } = useContext(AdminContext);
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
                    <button onClick={() => handleModalUpdateRoleOpen(row)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                    <button onClick={() => handleModalDeleteRoleOpen(row.id)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                </div>
            )
        }
    ];
    const [isLoading, setIsLoading] = useState(false);

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
        deleteRole(idRoleToDelete);
        setMessageNotification('Rôle supprimé avec succès');
        setShowModalDeleteRole(false);
    };

    console.log("roles", roles);

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
                {showModalAddRole && <ModalAddRole showModal={showModalAddRole} handleModalClose={handleModalAddRoleClose} />}
                {showModalUpdateRole && <ModalEditRole roleData={editRoleData} showModal={showModalUpdateRole} handleModalClose={handleModalUpdateRoleClose} />}
                {showModalDeleteRole && <ModalConfirmation handleConfirm={handleConfirmDeleteRole} show={showModalDeleteRole} handleModalClose={handleModalDeleteRoleClose} />}
            </div>
        </div>
    );
};

export default RolePage;
