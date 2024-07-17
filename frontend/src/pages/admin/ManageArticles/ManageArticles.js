import React, { useEffect, useState } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';

const ManageArticles = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion des articles';
    }, []);

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

    const handleSave = (data) => {
        setTbodyData(tbodyData.map(item => item.idpublication === data.idpublication ? data : item));
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setTbodyData(tbodyData.filter(item => item.idpublication !== id));
        handleCloseModal();
    };

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

    const initialTbodyData = [
        {
            "idpublication": 1,
            "category": "Politique",
            "description": "Contenu de l'article 1",
            "lien": "https://lequipe.fr",
            "citoyen_mail": "mail@mail.com",
            "author": "Auteur 1",
            "date_pub": "01/01/2021",
            "pub_validee": "En attente",
            "pub_signalee": "Non",
            "nbr_vues": 3000
        },
        {
            "idpublication": 2,
            "category": "Sport",
            "description": "Contenu de l'article 2",
            "lien": "https://lemonde.fr",
            "citoyen_mail": "mail@mail.com",
            "author": "Auteur 2",
            "date_pub": "02/01/2021",
            "pub_validee": "Validé",
            "pub_signalee": "Oui",
            "nbr_vues": 5
        },
        {
            "idpublication": 3,
            "category": "Culture",
            "description": "Contenu de l'article 3",
            "lien": "https://lefigaro.fr",
            "citoyen_mail": "mail@mail.com",
            "author": "Auteur 3",
            "date_pub": "03/01/2021",
            "pub_validee": "Refusé",
            "pub_signalee": "Non",
            "nbr_vues": 10
        },
    ];

    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);
    const [tbodyData, setTbodyData] = useState(initialTbodyData);

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
                    onSave={handleSave}
                    entityName="article"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    onDelete={() => handleDelete(isDeleting)}
                    id={isDeleting}
                    entityName="article"
                    masculine={true}
                    rowTitle={"ID " + tbodyData.find(item => item.idpublication === isDeleting)?.idpublication}
                />
            )}
        </>
    );
};

export default ManageArticles;
