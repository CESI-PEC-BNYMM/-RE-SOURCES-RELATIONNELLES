import React from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';

const ManageCategories = () => {
    const handleModalEditCategorie = (row) => {
        alert(`Édition de la catégorie ${row.libelle}`);
    };

    const handleModalDeleteCategorie = (id) => {
        alert(`Suppression de la catégorie ${id}`);
    };

    return (
        <ManageModeration
            title="Gestion des catégories"
            context="catégories"
            theadData={[
                {
                    "key": "idcategorie",
                    "label": "ID",
                    "edit": false,
                },
                {
                    "key": "libelle",
                    "label": "Libellé",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "actif",
                    "label": "Actif",
                    "edit": true,
                    "required": true
                },
                {
                    "key": "action",
                    "label": "Action",
                    "edit": false,
                    "render": (value, row, index) => (
                        <div className="d-flex gap-2 align-items-center justify-content-center">
                            <button onClick={() => handleModalEditCategorie(row)} className="btn d-flex align-items-center justify-content-center"><FaEdit className="action-icon mr-2 text-primary" /></button>
                            <button onClick={() => handleModalDeleteCategorie(row.idcategorie)} className="btn d-flex align-items-center justify-content-center"><FaTrash className="action-icon text-danger" /></button>
                        </div>
                    )
                }
            ]}
            tbodyData={[
                {
                    "idcategorie": 1,
                    "libelle": "Sport",
                    "actif": "Oui"
                },
                {
                    "idcategorie": 2,
                    "libelle": "Cuisine",
                    "actif": "Non"
                },
                {
                    "idcategorie": 3,
                    "libelle": "Voyage",
                    "actif": "Non"
                },
                {
                    "idcategorie": 4,
                    "libelle": "Musique",
                    "actif": "Oui"
                },
                {
                    "idcategorie": 5,
                    "libelle": "Informatique",
                    "actif": "Non"
                }
            ]}
            filterBy={[
                {
                    "key": "actif",
                    "label": "Actif"
                }
            ]}
            addButton={true}
        />
    );
}

export default ManageCategories;
