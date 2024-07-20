import React, { useState, useEffect } from 'react';
import ManageModeration from '../../../components/ModerationManage/ModerationManage';
import { FaEdit, FaTrash } from 'react-icons/fa';
import EditModal from '../../../components/EditModal/EditModal';
import DeleteModal from '../../../components/DeleteModal/DeleteModal';
// import ErrorModal from '../../../components/ErrorModal/ErrorModal';
// import SuccessModal from '../../../components/SuccessModal/SuccessModal';
// import axios from 'axios';

const ManageCommentaires = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion des commentaires';
        // fetchCommentaires();
    }, []);

    // const api_url = process.env.REACT_APP_API_URI + '/api/commentaires';
    const [isEditing, setIsEditing] = useState(null);
    const [isDeleting, setIsDeleting] = useState(null);
    // const [showErrorModal, setShowErrorModal] = useState(false);
    // const [errorMessage, setErrorMessage] = useState('');
    // const [showSuccessModal, setShowSuccessModal] = useState(false);

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

    // const fetchCommentaires = async () => {
    //     try {
    //         const response = await axios.get(`${api_url}/list`);
    //         setTbodyData(response.data);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la récupération des commentaires : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    // };

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

    // const handleSave = async (data) => {
    //     try {
    //         const queryParams = new URLSearchParams({
    //             idCommentaire: data.idcommentaire,
    //             idPublication: data.idpublication,
    //             textCommentaire: data.text_commentaire,
    //             commentaireSignale: data.commentaire_signale,
    //             type: data.type,
    //             citoyenMail: data.citoyen_mail,
    //             nomPrenom: data.nom_prenom
    //         }).toString();
    //         await axios.post(`${api_url}/publish?${queryParams}`, null, {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         });
    //         fetchCommentaires();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la sauvegarde du commentaire : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

    // const handleDelete = async (id) => {
    //     try {
    //         await axios.delete(`${api_url}/delete/${token}/${id}`);
    //         fetchCommentaires();
    //         setShowSuccessModal(true);
    //     } catch (error) {
    //         setErrorMessage('Erreur lors de la suppression du commentaire : ' + error.message);
    //         setShowErrorModal(true);
    //     }
    //     handleCloseModal();
    // };

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
                    // onSave={handleSave}
                    entityName="commentaire"
                    masculine={true}
                />
            )}
            {isDeleting !== null && (
                <DeleteModal
                    show={isDeleting !== null}
                    onHide={handleCloseModal}
                    // onDelete={() => handleDelete(isDeleting)}
                    id={isDeleting}
                    entityName="commentaire"
                    masculine={true}
                    rowTitle={"ID " + tbodyData.find(item => item.idcommentaire === isDeleting)?.idcommentaire}
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

export default ManageCommentaires;
