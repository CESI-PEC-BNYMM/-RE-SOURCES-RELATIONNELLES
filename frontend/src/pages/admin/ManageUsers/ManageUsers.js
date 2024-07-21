import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import AddModal from '../../../components/AddModal/AddModal';
// import ErrorModal from '../../../components/ErrorModal/ErrorModal';
// import SuccessModal from '../../../components/SuccessModal/SuccessModal';
// import axios from 'axios';

const ManageUsers = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion des utilisateurs';
        // fetchUsers();
    }, []);

    // const api_url = process.env.REACT_APP_API_URI + '/api/users';
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);
    // const [showErrorModal, setShowErrorModal] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    // const [showSuccessModal, setShowSuccessModal] = useState(false);

    // const fetchUsers = async () => {
    //     try {
    //         const response = await axios.get(`${api_url}/list`);
    //         setTbodyData(response.data);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la récupération des utilisateurs : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    // };

    const theadData = [
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
            "required": true,
            "type": "select",
            "options": ["Superadministateur", "Administrateur", "Modérateur", "Citoyen"],
            "filterable": true
        },
        {
            "key": "action",
            "label": "Action",
            "edit": false,
            "render": (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEdit(row)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                    <button onClick={() => handleModalDelete(row)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                </div>
            )
        }
    ];

    const [tbodyData, setTbodyData] = useState([
        { id: 1, name: 'Feather', firstname: 'Alice', email: 'alice@example.com', role: 'Superadministateur' },
        { id: 2, name: 'Charles', firstname: 'Bob', email: 'bob@example.com', role: 'Administrateur' },
    ]);

    const handleModalEdit = (row) => {
        setIsEditing(row);
    };

    const handleModalDelete = (row) => {
        setIsDeleting(row);
    };

    const handleModalAdd = () => {
        setIsAdding(true);
    };

    const handleCloseModal = () => {
        setIsEditing(null);
        setIsAdding(false);
        setIsDeleting(null);
    };

    // const handleSave = async (data) => {
    //     try {
    //         if (isAdding) {
    //             await axios.post(`${api_url}/add`, data);
    //             fetchUsers();
    //             setShowSuccessModal(true);
    //         } else if (isEditing) {
    //             await axios.put(`${api_url}/edit/${data.id}`, data);
    //             fetchUsers();
    //             setShowSuccessModal(true);
    //         }
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la sauvegarde de l\'utilisateur : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${api_url}/delete/${id}`);
    //         fetchUsers();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la suppression de l\'utilisateur : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    return (
        <>
            <ManageModeration
                title="Gestion des utilisateurs"
                context="utilisateurs"
                theadData={theadData}
                tbodyData={tbodyData}
                filterBy={theadData.filter(col => col.filterable)}
                addButton={handleModalAdd}
            />
            {isEditing && (
                <EditModal
                    show={isEditing !== null}
                    onHide={handleCloseModal}
                    data={isEditing}
                    theadData={theadData}
                    // onSave={handleSave}
                    entityName="utilisateur"
                    masculine={true}
                />
            )}
            {isAdding && (
                <AddModal
                    show={isAdding}
                    onHide={handleCloseModal}
                    theadData={theadData}
                    // onSave={handleSave}
                    entityName="utilisateur"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    // onDelete={() => handleDelete(isDeleting.id)}
                    id={isDeleting.id}
                    entityName="utilisateur"
                    masculine={true}
                    rowTitle={isDeleting.name + ' ' + isDeleting.firstname + ' (' + isDeleting.email + ')'}
                />
            )}
            {/* <ErrorModal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                title="Erreur"
                message={errorMessage}
            />
            <SuccessModal
                show={showSuccessModal}
                onHide={() => setShowSuccessModal(false)}
                title="Succès"
                message="Opération réussie"
            /> */}
        </>
    );
};

export default ManageUsers;
