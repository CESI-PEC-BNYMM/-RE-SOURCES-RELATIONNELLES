import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AdminContext } from '../../../utils/adminContext';
import TableTemplate from '../../../components/TableTemplate/TableTemplate';
import IsLoading from '../../../components/IsLoading/IsLoading';
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirmation from './ModalConfirmation';

const UserPage = () => {
    const { roles, users, deleteUser, setMessageNotification } = useContext(AdminContext);
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [idUserToDelete, setIdUserToDelete] = useState(null);
    const [editUserData, setEditUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        // Cette partie pourrait être utilisée pour charger les données depuis un backend
        console.log("Users:", users);
    }, [users]);

    const handleModalAddUserOpen = () => setShowModalAddUser(true);
    const handleModalAddUserClose = () => setShowModalAddUser(false);

    const handleModalEditUserOpen = (userData) => {
        setEditUserData(userData);
        setShowModalEditUser(true);
    };
    const handleModalEditUserClose = () => setShowModalEditUser(false);

    const handleModalDeleteUserOpen = (userId) => {
        setIdUserToDelete(userId);
        setShowModalDeleteUser(true);
    };
    const handleModalDeleteUserClose = () => setShowModalDeleteUser(false);

    const handleConfirmDeleteUser = (userId) => {
        deleteUser(userId);
        setMessageNotification('Utilisateur supprimé avec succès');
        setShowModalDeleteUser(false);
    };

    const header = [
        {
            "key": "id",
            "label": "ID",
            "edit": false,
        },
        {
            "key": "name",
            "label": "Nom",
            "edit": true,
            "required": true
        },
        {
            "key": "firstname",
            "label": "Prénom",
            "edit": true,
            "required": true
        },
        {
            "key": "email",
            "label": "Email",
            "edit": true,
            "required": false
        },
        {
            "key": "role",
            "label": "Rôle",
            "edit": true,
            "required": true
        },
        {
            "key": "action",
            "label": "Action",
            "edit": false,
            "render": (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEditUserOpen(row)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                    <button onClick={() => handleModalDeleteUserOpen(row.id)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                </div>
            )
        }
    ];

    return (
        <div className="Content">
            <h4>Administration : Gestion des Utilisateurs</h4>
            <form className="row g-3 whiteBox searchBox">
                <div className="col-md-2">
                    <label htmlFor="idUser" className="form-label">ID</label>
                    <input type="text" className="form-control" id="idUser" placeholder="123456" />
                </div>
                <div className="col-md-2">
                    <label htmlFor="nomUser" className="form-label">Nom</label>
                    <input type="text" className="form-control" id="nomUser" placeholder="Martin" />
                </div>
                <div className="col-md-2">
                    <label htmlFor="prenomUser" className="form-label">Prénom</label>
                    <input type="text" className="form-control" id="prenomUser" placeholder="Jean" />
                </div>
                <div className="col-md-6">
                    <label htmlFor="mailUser" className="form-label">Mail</label>
                    <input type="text" className="form-control" id="mailUser" placeholder="martin.jean@mail.com" />
                </div>
                <div className="col-md-3">
                    <label htmlFor="roleUser" className="form-label">Rôle</label>
                    <select id="roleUser" className="form-select">
                        <option value="0" disabled selected>Choisir un rôle</option>
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                </div>
                <div className="col-md-3"></div>
                <div className="col-md-6 d-flex gap-3 justify-content-end">
                    <button type="button" className="btn btn-outline-primary w-50 d-none" id='resetButton' onClick={() => {
                        document.getElementById('idUser').value = '';
                        document.getElementById('nomUser').value = '';
                        document.getElementById('prenomUser').value = '';
                        document.getElementById('mailUser').value = '';
                        document.getElementById('roleUser').value = '0';
                        document.getElementById('resetButton').classList.add('d-none');
                    }}>Réinitialiser</button>
                    <button type="submit" className="btn btn-primary w-50" onClick={(event) => {
                        event.preventDefault();
                        const search = {
                            id: document.getElementById('idUser').value,
                            name: document.getElementById('nomUser').value,
                            firstname: document.getElementById('prenomUser').value,
                            email: document.getElementById('mailUser').value,
                            role: document.getElementById('roleUser').value
                        };
                        console.log(search);
                        document.getElementById('resetButton').classList.remove('d-none');
                    }}>Rechercher</button>
                </div>
            </form>
            <div className='whiteBox gap-4'>
                <div className="d-flex justify-content-between align-items-center w-100">
                    <h5>Liste des utilisateurs</h5>
                    <button className="btn btn-outline-primary" onClick={handleModalAddUserOpen}>
                        Ajouter un utilisateur
                    </button>
                </div>
                <div className="d-flex justify-content-end w-100">
                    <small>{users.length} utilisateurs trouvés</small>
                </div>
                <TableTemplate
                    theadData={header}
                    tbodyData={users}
                    isLoading={isLoading}
                />
                {showModalAddUser && <ModalAddUser showModal={showModalAddUser} handleModalClose={handleModalAddUserClose} />}
                {showModalEditUser && <ModalEditUser userData={editUserData} showModal={showModalEditUser} handleModalClose={handleModalEditUserClose} />}
                {showModalDeleteUser && <ModalConfirmation handleConfirm={() => handleConfirmDeleteUser(idUserToDelete)} show={showModalDeleteUser} handleModalClose={handleModalDeleteUserClose} />}
            </div>
        </div>
    );
}

export default UserPage;
