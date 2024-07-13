import React, { useState } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';

const ManageTickets = () => {
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);

    const [tbodyData, setTbodyData] = useState([
        {
            "idticket": 1,
            "objet": "Problème de connexion",
            "description": "Je n'arrive pas à me connecter à mon compte.",
            "etat": "Résolu",
            "nom_createur": "Dupont",
            "prenom_createur": "Jean",
            "citoyen_mail": "jean.dupont@example.com"
        },
        {
            "idticket": 2,
            "objet": "Erreur 404",
            "description": "Je rencontre une erreur 404 sur certaines pages.",
            "etat": "Nouveau",
            "nom_createur": "Martin",
            "prenom_createur": "Pierre",
            "citoyen_mail": "pierre.martin@example.com"
        },
        {
            "idticket": 3,
            "objet": "Problème de formulaire",
            "description": "Le formulaire ne fonctionne pas correctement.",
            "etat": "Résolu",
            "nom_createur": "Durand",
            "prenom_createur": "Marie",
            "citoyen_mail": "marie.durand@example.com"
        }
    ]);

    const handleModalEditTicket = (id) => {
        setIsEditing(id);
    };

    const handleModalDeleteTicket = (id) => {
        setIsDeleting(id);
    };

    const handleCloseModal = () => {
        setIsEditing(null);
        setIsDeleting(null);
    };

    const handleSave = (data) => {
        setTbodyData(tbodyData.map(item => item.idticket === data.idticket ? data : item));
        handleCloseModal();
    };

    const handleDelete = (id) => {
        setTbodyData(tbodyData.filter(item => item.idticket !== id));
        handleCloseModal();
    };

    const theadData = [
        {
            "key": "idticket",
            "label": "ID",
            "edit": false,
        },
        {
            "key": "objet",
            "label": "Objet",
            "edit": false,
        },
        {
            "key": "description",
            "label": "Description",
            "edit": false
        },
        {
            "key": "etat",
            "label": "État",
            "edit": true,
            "required": true,
            "type": "select",
            "options": ["Nouveau", "En cours", "Résolu"],
            "filterable": true
        },
        {
            "key": "nom_createur",
            "label": "Nom créateur",
            "edit": false
        },
        {
            "key": "prenom_createur",
            "label": "Prénom créateur",
            "edit": false
        },
        {
            "key": "citoyen_mail",
            "label": "Mail citoyen",
            "edit": false
        },
        {
            "key": "action",
            "label": "Action",
            "edit": false,
            "render": (value, row, index) => (
                <div className="d-flex gap-2 align-items-center justify-content-center">
                    <button onClick={() => handleModalEditTicket(row.idticket)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                    <button onClick={() => handleModalDeleteTicket(row.idticket)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                </div>
            )
        }
    ];

    return (
        <>
            <ManageModeration
                title="Gestion des tickets"
                context="tickets"
                theadData={theadData}
                tbodyData={tbodyData}
                filterBy={theadData.filter(col => col.filterable)}
                addButton={null}
                manageTicketsField={true}
            />
            {isEditing && (
                <EditModal
                    show={isEditing !== null}
                    onHide={handleCloseModal}
                    data={tbodyData.find(item => item.idticket === isEditing)}
                    theadData={theadData}
                    onSave={handleSave}
                    entityName="ticket"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    onDelete={() => handleDelete(isDeleting)}
                    id={isDeleting}
                    entityName="ticket"
                    masculine={true}
                    rowTitle={"ID " + isDeleting}
                />
            )}
        </>
    );
}

export default ManageTickets;
