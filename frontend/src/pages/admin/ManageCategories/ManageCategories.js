import React, { useState } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import AddModal from '../../../components/AddModal/AddModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';

const ManageCategories = () => {
    const theadData = [
        { key: "idcategorie", label: "ID", edit: false },
        { key: "libelle", label: "Libellé", edit: true, required: true },
        { key: "actif", label: "Actif", edit: true, required: true, type: "select", options: ["Oui", "Non"], filterable: true },
        {
            key: "action",
            label: "Action",
            edit: false,
            render: (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEdit(row)} className="btn d-flex align-items-center justify-content-center">
                        <FaEdit className="action-icon mr-2 text-primary" />
                    </button>
                    <button onClick={() => handleModalDelete(row)} className="btn d-flex align-items-center justify-content-center">
                        <FaTrash className="action-icon text-danger" />
                    </button>
                </div>
            )
        }
    ];

    const initialTbodyData = [
        { idcategorie: 1, libelle: "Sport", actif: "Oui" },
        { idcategorie: 2, libelle: "Cuisine", actif: "Non" },
        { idcategorie: 3, libelle: "Voyage", actif: "Non" },
        { idcategorie: 4, libelle: "Musique", actif: "Oui" },
        { idcategorie: 5, libelle: "Informatique", actif: "Non" }
    ];

    const [tbodyData, setTbodyData] = useState(initialTbodyData);
    const [isEditing, setIsEditing] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [isDeleting, setIsDeleting] = useState(null);

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
            setTbodyData([...tbodyData, { ...data, idcategorie: Math.max(...tbodyData.map(item => item.idcategorie)) + 1 }]);
        } else if (isEditing) {
            setTbodyData(tbodyData.map(item => item.idcategorie === data.idcategorie ? data : item));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setTbodyData(tbodyData.filter(item => item.idcategorie !== id));
        handleCloseModal();
    };

    return (
        <>
            <ManageModeration
                title="Gestion des catégories"
                context="catégories"
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
                    entityName="catégorie"
                    masculine={false}
                />
            )}
            {isAdding && (
                <AddModal
                    show={isAdding}
                    onHide={handleCloseModal}
                    theadData={theadData}
                    onSave={handleSave}
                    entityName="catégorie"
                    masculine={false}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    onDelete={handleDelete}
                    id={isDeleting.idcategorie}
                    entityName="catégorie"
                    masculine={false}
                    rowTitle={isDeleting.libelle}
                />
            )}
        </>
    );
};

export default ManageCategories;
