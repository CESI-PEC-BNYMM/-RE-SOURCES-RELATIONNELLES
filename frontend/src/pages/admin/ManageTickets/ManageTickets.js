import React from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageTickets = () => {
    const handleModalEditTicket = (id) => {
        alert(`Édition du ticket ${id}`);
    };

    const handleModalDeleteTicket = (id) => {
        alert(`Suppression du ticket ${id}`);
    };

    return (
        <ManageModeration
            title="Gestion des tickets"
            context="tickets"
            theadData={[
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
                    "required": true
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
            ]}
            tbodyData={[
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
            ]}
            filterBy={[
                {
                    "key": "etat",
                    "label": "État"
                }
            ]}
            addButton={null}
            manageTicketsField={"Résolu"}
        />
    );
}

export default ManageTickets;
