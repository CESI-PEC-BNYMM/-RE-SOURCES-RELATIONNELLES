import React, { useState, useEffect } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import AddModal from '../../../components/AddModal/AddModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import SuccessModal from '../../../components/SuccessModal/SuccessModal';
import axios from 'axios';

const ManageCategories = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion des catégories';
    }, []);

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
    // const [showErrorModal, setShowErrorModal] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    // const [showSuccessModal, setShowSuccessModal] = useState(false);
    // const api_url = process.env.REACT_APP_API_URI + '/api';

    // const fetchCategories = async () => {
    //     try {
    //         const response = await axios.get(`${api_url}/categories/list`);
    //         setTbodyData(response.data);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la récupération des catégories : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    // };

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
    //         const queryParams = new URLSearchParams({
    //             idCategorie: data.idcategorie,
    //             libelle: data.libelle,
    //             actif: data.actif === "Oui"
    //         }).toString();
    //         await axios.put(`${api_url}/categories/addCategorie?${queryParams}`);
    //         fetchCategories();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la sauvegarde de la catégorie : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${api_url}/categories/deleteCategorie?idCategorie=${id}`);
    //         fetchCategories();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la suppression de la catégorie : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

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
                    // onSave={handleSave}
                    entityName="catégorie"
                    masculine={false}
                />
            )}
            {isAdding && (
                <AddModal
                    show={isAdding}
                    onHide={handleCloseModal}
                    theadData={theadData}
                    // onSave={handleSave}
                    entityName="catégorie"
                    masculine={false}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    // onDelete={handleDelete}
                    id={isDeleting.idcategorie}
                    entityName="catégorie"
                    masculine={false}
                    rowTitle={isDeleting.libelle}
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

export default ManageCategories;
