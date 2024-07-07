import React from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageArticles = () => {
    const handleModalEditArticleOpen = (row) => {
        alert(`Édition de l'article ${row.title}`);
    };

    const handleModalDeleteArticleOpen = (id) => {
        alert(`Suppression de l'article ${id}`);
    };

    return (
        <ManageModeration
            title="Gestion des publications"
            context="publications"
            theadData={[
                {
                    "key": "id",
                    "label": "ID",
                    "edit": false,
                },
                {
                    "key": "title",
                    "label": "Titre",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "category",
                    "label": "Catégorie",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "content",
                    "label": "Contenu",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "idAuthor",
                    "label": "ID Auteur",
                    "edit": true,
                    "required": true 
                },
                {
                    "key": "author",
                    "label": "Auteur",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "date",
                    "label": "Date",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "status",
                    "label": "Statut",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "signal",
                    "label": "Signalée",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "action",
                    "label": "Action",
                    "edit": false,
                    "render": (value, row, index) => (
                        <div className="d-flex gap-2 align-items-center justify-content-center">
                            <button onClick={() => handleModalEditArticleOpen(row)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                            <button onClick={() => handleModalDeleteArticleOpen(row.id)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                        </div>
                    )
                }
            ]}
            tbodyData={[
                {
                    "id": 1,
                    "title": "Article 1",
                    "category": "Politique",
                    "content": "Contenu de l'article 1",
                    "idAuthor": 1,
                    "author": "Auteur 1",
                    "date": "01/01/2021",
                    "status": "En attente",
                    "signal": "Non"
                },
                {
                    "id": 2,
                    "title": "Article 2",
                    "category": "Sport",
                    "content": "Contenu de l'article 2",
                    "idAuthor": 2,
                    "author": "Auteur 2",
                    "date": "02/01/2021",
                    "status": "Validé",
                    "signal": "Oui"
                },
                {
                    "id": 3,
                    "title": "Article 3",
                    "category": "Culture",
                    "content": "Contenu de l'article 3",
                    "idAuthor": 3,
                    "author": "Auteur 3",
                    "date": "03/01/2021",
                    "status": "Refusé",
                    "signal": "Non"
                },
            ]}
            filterBy={[
                {
                    "key": "status",
                    "label": "Statut"
                },
                {
                    "key": "signal",
                    "label": "Signalée"
                }
            ]}
            addButton={false}
        />
    );
}

export default ManageArticles;
