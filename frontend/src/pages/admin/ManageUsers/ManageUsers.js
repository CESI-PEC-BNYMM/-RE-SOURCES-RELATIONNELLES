import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import TableTemplate from '../../../components/TableTemplate/TableTemplate';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import AddModal from '../../../components/AddModal/AddModal';

const ManageUsers = () => {
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);

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

    const initialTbodyData = [
        { id: 1, name: 'Feather', firstname: 'Alice', email: 'alice@example.com', role: 'Superadministateur' },
        { id: 2, name: 'Charles', firstname: 'Bob', email: 'bob@example.com', role: 'Administrateur' },
    ];

    const [tbodyData, setTbodyData] = useState(initialTbodyData);

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

    const handleSave = (data) => {
        if (isAdding) {
            setTbodyData([...tbodyData, { ...data, id: Math.max(...tbodyData.map(item => item.id)) + 1 }]);
        } else if (isEditing) {
            setTbodyData(tbodyData.map(item => item.id === data.id ? data : item));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setTbodyData(tbodyData.filter(item => item.id !== id));
        handleCloseModal();
    };

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
                    onSave={handleSave}
                    entityName="utilisateur"
                    masculine={true}
                />
            )}
            {isAdding && (
                <AddModal
                    show={isAdding}
                    onHide={handleCloseModal}
                    theadData={theadData}
                    onSave={handleSave}
                    entityName="utilisateur"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    onDelete={handleDelete}
                    id={isDeleting.id}
                    entityName="utilisateur"
                    masculine={true}
                    rowTitle={isDeleting.name + ' ' + isDeleting.firstname + ' (' + isDeleting.email + ')'}
                />
            )}
        </>
    );
};

export default ManageUsers;
