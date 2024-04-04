import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { AdminContext } from '../../../utils/adminContext';
import ModalAddUser from './ModalAddUser';
import ModalEditUser from './ModalEditUser';
import ModalConfirmation from './ModalConfirmation';

const UserPage = () => {
    const { users, deleteUser, setMessageNotification } = useContext(AdminContext);
    const [showModalAddUser, setShowModalAddUser] = useState(false);
    const [showModalEditUser, setShowModalEditUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [idUserToDelete, setIdUserToDelete] = useState(null);
    const [editUserData, setEditUserData] = useState(null);

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

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-12 text-center">
                    <h2>Gestion des Utilisateurs</h2>
                </div>
                <div className="col-12 d-flex justify-content-center mb-3">
                    <button className="btn btn-primary" onClick={handleModalAddUserOpen}>
                        Ajouter un utilisateur
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className='col-12 col-md-10'>
                    <div className="table-responsive">
                        <table className="table table-dark">
                            <tbody>
                                {users.map((user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                        <td className="text-center">
                                            <FaEdit onClick={() => handleModalEditUserOpen(user)} className="action-icon mr-2 text-primary" />
                                            <FaTrash onClick={() => handleModalDeleteUserOpen(user.id)} className="action-icon text-danger" />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    </div>
                    {showModalAddUser && <ModalAddUser showModal={showModalAddUser} handleModalClose={handleModalAddUserClose} />}
                    {showModalEditUser && <ModalEditUser userData={editUserData} showModal={showModalEditUser} handleModalClose={handleModalEditUserClose} />}
                    {showModalDeleteUser && <ModalConfirmation handleConfirm={() => handleConfirmDeleteUser(idUserToDelete)} show={showModalDeleteUser} handleModalClose={handleModalDeleteUserClose} />}
                </div>
            </div>
        </div>
    );
}

export default UserPage;
