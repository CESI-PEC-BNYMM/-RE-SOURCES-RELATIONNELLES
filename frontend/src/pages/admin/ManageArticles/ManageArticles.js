import React, { useEffect, useState } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
// import ErrorModal from '../../../components/ErrorModal/ErrorModal';
// import SuccessModal from '../../../components/SuccessModal/SuccessModal';
// import axios from 'axios';

const ManageArticles = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion des articles';
        // fetchArticles();
    }, []);

    // const api_url = process.env.REACT_APP_API_URI + '/api/publications';
    // const [showErrorModal, setShowErrorModal] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    // const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);
    const [tbodyData, setTbodyData] = useState([]);

    // const fetchArticles = async () => {
    //     try {
    //         const response = await axios.get(`${api_url}/list`);
    //         setTbodyData(response.data);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la récupération des articles : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    // };

    const handleModalEditArticleOpen = (row) => {
        setIsEditing(row);
    };

    const handleModalDeleteArticleOpen = (id) => {
        setIsDeleting(id);
    };

    const handleCloseModal = () => {
        setIsEditing(null);
        setIsDeleting(null);
    };

    // const handleSave = async (data) => {
    //     try {
    //         const queryParams = new URLSearchParams({
    //             idPublication: data.idpublication,
    //             category: data.category,
    //             description: data.description,
    //             lien: data.lien,
    //             citoyen_mail: data.citoyen_mail,
    //             author: data.author,
    //             date_pub: data.date_pub,
    //             pub_validee: data.pub_validee,
    //             pub_signalee: data.pub_signalee,
    //             nbr_vues: data.nbr_vues
    //         }).toString();
    //         await axios.post(`${api_url}/publish?${queryParams}`, null, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         fetchArticles();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la sauvegarde de l\'article : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${api_url}/delete/${token}/${id}`);
    //         fetchArticles();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la suppression de l\'article : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    const theadData = [
        { key: "idpublication", label: "ID", edit: false },
        { key: "category", label: "Catégorie", edit: true, required: true, type: "select", options: ["Politique", "Sport", "Culture"] },
        { key: "description", label: "Contenu", edit: true, required: true },
        { key: "lien", label: "URL", edit: true, required: true },
        { key: "citoyen_mail", label: "Mail citoyen", edit: false },
        { key: "author", label: "Auteur", edit: false },
        { key: "date_pub", label: "Date", edit: false },
        { key: "pub_validee", label: "Statut", edit: true, required: true, type: "select", options: ["En attente", "Validé", "Refusé"], filterable: true },
        { key: "pub_signalee", label: "Signalée", edit: true, required: true, type: "select", options: ["Oui", "Non"], filterable: true },
        { key: "nbr_vues", label: "Vues", edit: false },
        {
            key: "action",
            label: "Action",
            edit: false,
            render: (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEditArticleOpen(row)} className="btn d-flex align-items-center justify-content-center">
                        <FaEdit className="action-icon mr-2 text-primary" />
                    </button>
                    <button onClick={() => handleModalDeleteArticleOpen(row.idpublication)} className="btn d-flex align-items-center justify-content-center">
                        <FaTrash className="action-icon text-danger" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <ManageModeration
                title="Gestion des publications"
                context="publications"
                theadData={theadData}
                tbodyData={tbodyData}
                filterBy={theadData.filter(col => col.filterable)}
                addButton={null}
            />
            {isEditing && (
                <EditModal
                    show={isEditing !== null}
                    onHide={handleCloseModal}
                    data={isEditing}
                    theadData={theadData}
                    // onSave={handleSave}
                    entityName="article"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    // onDelete={() => handleDelete(isDeleting)}
                    id={isDeleting}
                    entityName="article"
                    masculine={true}
                    rowTitle={"ID " + tbodyData.find(item => item.idpublication === isDeleting)?.idpublication}
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

export default ManageArticles;
