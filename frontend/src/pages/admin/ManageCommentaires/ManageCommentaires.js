import React, { useState } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';

const ManageCommentaires = () => {
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);

    const [tbodyData, setTbodyData] = useState([

        {
            "idcommentaire": 1,
            "idpublication": 1,
            "text_commentaire": "Commentaire 1",
            "commentaire_signale": "Oui",
            "type": "Késako ?",
            "citoyen_mail": "mail@mail.com",
            "nom_prenom": "Jean Dupont"
        },
        {
            "idcommentaire": 2,
            "idpublication": 1,
            "text_commentaire": "Commentaire 2",
            "commentaire_signale": "Non",
            "type": "Késako ?",
            "citoyen_mail": "mail@mail.com",
            "nom_prenom": "Jeanne Goujon"
        },
        {
            "idcommentaire": 3,
            "idpublication": 2,
            "text_commentaire": "Commentaire 3",
            "commentaire_signale": "Oui",
            "type": "Késako ?",
            "citoyen_mail": "mail@mail.com",
            "nom_prenom": "Olivia Lepic"
        },
        {
            "idcommentaire": 4,
            "idpublication": 4,
            "text_commentaire": "Commentaire 4",
            "commentaire_signale": "Non",
            "type": "Késako ?",
            "citoyen_mail": "mail@mail.com",
            "nom_prenom": "Fanny Adams"
        }
    ]);

    const handleModalEditCommentaire = (id) => {
        setIsEditing(id);
    };

    const handleModalDeleteCommentaire = (id) => {
        setIsDeleting(id);
    };

    const handleCloseModal = () => {
        setIsEditing(null);
        setIsDeleting(null);
    };

    const handleSave = (data) => {
        setTbodyData(tbodyData.map(item => item.idcommentaire === data.idcommentaire ? data : item));
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setTbodyData(tbodyData.filter(item => item.idcommentaire !== id));
        handleCloseModal();
    };

    const theadData = [
        {
            "key": "idcommentaire",
            "label": "ID",
            "edit": false,
        },
        {
            "key": "idpublication",
            "label": "ID Publication",
            "edit": false,
        },
        {
            "key": "text_commentaire",
            "label": "Commentaire",
            "edit": false
        },
        {
            "key": "commentaire_signale",
            "label": "Commentaire Signalé",
            "edit": true,
            "required": true,
            "type": "select",
            "options": ["Oui", "Non"],
            "filterable": true
        },
        {
            "key": "type",
            "label": "Type",
            "edit": true,
            "required": true,
            "filterable": true,
        },
        {
            "key": "citoyen_mail",
            "label": "Mail Citoyen",
            "edit": false
        },
        {
            "key": "nom_prenom",
            "label": "Nom & Prénom Citoyen",
            "edit": false
        },
        {
            "key": "action",
            "label": "Action",
            "edit": false,
            "render": (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEditCommentaire(row.idcommentaire)} className="btn d-flex align-items-center justify-content-center">
                        <FaEdit className="action-icon mr-2 text-primary" />
                    </button>
                    <button onClick={() => handleModalDeleteCommentaire(row.idcommentaire)} className="btn d-flex align-items-center justify-content-center">
                        <FaTrash className="action-icon text-danger" />
                    </button>
                </div>
            )
        }
    ];

    return (
        <>
            <ManageModeration
                title="Gestion des commentaires"
                context="commentaires"
                theadData={theadData}
                tbodyData={tbodyData}
                filterBy={theadData.filter(col => col.filterable)}
                addButton={null}
            />
            {isEditing && (
                <EditModal
                    show={isEditing !== null}
                    onHide={handleCloseModal}
                    data={tbodyData.find(item => item.idcommentaire === isEditing)}
                    theadData={theadData}
                    onSave={handleSave}
                    entityName="commentaire"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    onDelete={() => handleDelete(isDeleting)}
                    id={isDeleting}
                    entityName="commentaire"
                    masculine={true}
                    rowTitle={"ID " + tbodyData.find(item => item.idcommentaire === isDeleting)?.idcommentaire}
                />
            )}
        </>
    );
};

export default ManageCommentaires;
