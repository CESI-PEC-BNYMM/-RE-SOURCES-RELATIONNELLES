import React from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCommentaires = () => {
    const handleModalEditCommentaire = (id) => {
        alert(`Édition du commentaire ${id}`);
    };

    const handleModalDeleteCommentaire = (id) => {
        alert(`Suppression du commentaire ${id}`);
    };

    return (
        <ManageModeration
            title="Gestion des commentaires"
            context="commentaires"
            theadData={[
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
                    "required": true
                },
                {
                    "key": "type",
                    "label": "Type",
                    "edit": true,
                    "required": true
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
                            <button onClick={() => handleModalEditCommentaire(row.idcommentaire)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                            <button onClick={() => handleModalDeleteCommentaire(row.idcommentaire)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                        </div>
                    )
                }
            ]}
            tbodyData={[
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
            ]}
            filterBy={[
                {
                    "key": "commentaire_signale",
                    "label": "Commentaire Signalé"
                },
                {
                    "key": "type",
                    "label": "Type"
                }
            ]}
            addButton={false}
        />
    );
}

export default ManageCommentaires;
