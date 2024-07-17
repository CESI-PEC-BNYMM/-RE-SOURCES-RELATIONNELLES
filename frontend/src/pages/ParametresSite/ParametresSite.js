import React, { useState, useEffect } from 'react';
import { FaDownload, FaFileContract, FaMoon, FaQuestion, FaTrash } from "react-icons/fa";
import { Link, redirect } from 'react-router-dom';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import LoadingModal from '../../components/LoadingModal/LoadingModal';
import ConfirmationModal from '../../components/ConfirmationModal/ConfirmationModal';

const ParametresSite = () => {
    useEffect(() => {
        document.title = '(RE) – Paramètres du site';
        if (localStorage.getItem('darkMode') === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark-mode');
        }
    }, []);

    const [darkMode, setDarkMode] = useState(false);
    const [modalState, setModalState] = useState({
        showConfirmation: false,
        showLoading: false,
        showSuccess: false,
        showError: false,
        modalProps: {},
    });

    const handleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem('darkMode', newDarkMode);
        document.documentElement.classList.toggle('dark-mode', newDarkMode);
    };

    const resetModals = () => {
        setModalState({
            showConfirmation: false,
            showLoading: false,
            showSuccess: false,
            showError: false,
            modalProps: {},
        });
    };

    const handleModalShow = (type, props = {}) => {
        setModalState(prevState => ({
            ...prevState,
            [type]: true,
            modalProps: props,
        }));
    };

    const clearLocalStorage = () => {
        resetModals();
        handleModalShow('showLoading', { message: 'Suppression de vos données en cache en cours...' });
        try {
            localStorage.clear()
        } catch (error) {
            resetModals();
            handleModalShow('showError', {
                title: 'Erreur',
                message: 'Une erreur est survenue lors de la suppression de vos données en cache. Veuillez réessayer ou contacter le support si le problème persiste.',
                details: 'Erreur : ' + error.message,
                onHide: () => window.location.reload(),
            });
            return;
        }
        resetModals();
        handleModalShow('showSuccess', {
            title: 'Données supprimées',
            message: 'Vos données en cache ont bien été supprimées.',
            details: 'Vous avez été déconnecté.',
            onHide: () => window.location.href = '/',
        });
    };

    const downloadDatas = () => {
        resetModals();
        handleModalShow('showLoading', { message: 'Téléchargement de vos données en cours...' });
        setTimeout(() => {
            resetModals();
            handleModalShow('showSuccess', {
                title: 'Téléchargement terminé',
                message: 'Vos données ont bien été téléchargées.',
                details: 'Le fichier contenant vos données vous a été envoyé par email.',
                onHide: () => window.location.reload(),
            });
        }, 2000);
    };

    const deleteAccount = () => {
        resetModals();
        handleModalShow('showLoading', { message: 'Suppression de votre compte en cours...' });
        setTimeout(() => {
            resetModals();
            handleModalShow('showSuccess', {
                title: 'Compte supprimé',
                message: 'Votre compte a bien été supprimé.',
                details: 'Vous allez être redirigé vers la page d\'accueil.',
                onHide: () => window.location.href = '/',
            });
        }, 2000);
    };

    const sectionClassNames = 'd-flex align-items-center mt-2';
    const svgStyle = { fontSize: '1.3em', marginRight: '10px' };

    const ModalButton = ({ icon: Icon, label, onClick, btnClass }) => (
        <div className='mt-3'>
            <Icon style={svgStyle} />
            <button className={`btn btn-sm ${btnClass}`} onClick={onClick}>{label}</button>
        </div>
    );

    return (
        <div className="Content">
            <h4 className='mb-4'>Paramètres du site</h4>
            <div className="whiteBox p-4">
                <div className="row justify-content-between">
                    <div className="col-md-5 mb-4">
                        <h5>Accessibilité</h5>
                        <div className={sectionClassNames}>
                            <FaMoon style={svgStyle} />
                            <div className="form-check form-switch" style={{ userSelect: 'none' }}>
                                <input className="form-check-input" type="checkbox" role="switch" id="darkModeSwitcher" onClick={handleDarkMode} checked={darkMode} />
                                <label className="form-check-label" htmlFor="darkModeSwitcher">
                                    {darkMode ? 'Désactiver' : 'Activer'} le mode sombre
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <h5>Règlement et protection des données</h5>
                        <div className={sectionClassNames}>
                            <FaFileContract style={svgStyle} />
                            <Link to="/rgpd" className="btn btn-link">Règlement général de protection des données</Link>
                        </div>
                    </div>
                    <div className="col-md-5 mb-4">
                        <h5>Gestion des données</h5>
                        <ModalButton
                            icon={FaTrash}
                            label="Supprimer mes données en cache"
                            btnClass="btn-danger"
                            onClick={() => handleModalShow('showConfirmation', {
                                title: 'Supprimer mes données en cache',
                                message: 'Êtes-vous sûr de vouloir supprimer toutes les données stockées localement sur votre navigateur ?',
                                details: 'Cela aura pour effet de vous déconnecter.',
                                onConfirm: clearLocalStorage,
                                confirmText: 'Supprimer',
                                cancelText: 'Annuler',
                                confirmVariant: 'danger',
                                onHide: () => window.location.reload(),
                            })}
                        />
                        <ModalButton
                            icon={FaDownload}
                            label="Télécharger mes données"
                            btnClass="btn-primary"
                            onClick={() => handleModalShow('showConfirmation', {
                                title: 'Télécharger mes données',
                                message: 'Êtes-vous sûr de vouloir télécharger toutes les données vous concernant stockées sur notre serveur ?',
                                onConfirm: downloadDatas,
                                confirmText: 'Télécharger',
                                cancelText: 'Annuler',
                                confirmVariant: 'primary',
                                onHide: () => window.location.reload(),
                            })}
                        />
                        <div className={sectionClassNames}>
                            <FaQuestion style={svgStyle} />
                            <Link to="/support/faq#gerer-mes-donnees" className="btn btn-link">Comment gérer mes données ?</Link>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4">
                        <h5>Mon compte</h5>
                        <ModalButton
                            icon={FaTrash}
                            label="Supprimer mon compte"
                            btnClass="btn-danger"
                            onClick={() => handleModalShow('showConfirmation', {
                                title: 'Supprimer mon compte',
                                message: 'Êtes-vous sûr de vouloir supprimer votre compte ?',
                                details: `Cette action est irréversible et entraînera la suppression de toutes vos données.`,
                                onConfirm: deleteAccount,
                                confirmText: 'Supprimer',
                                cancelText: 'Annuler',
                                confirmVariant: 'danger',
                                onHide: () => window.location.reload(),
                            })}
                        />
                    </div>
                </div>
            </div>

            <ConfirmationModal {...modalState.modalProps} show={modalState.showConfirmation} onHide={modalState.modalProps.onHide} />
            <LoadingModal show={modalState.showLoading} message={modalState.modalProps.message} />
            <ErrorModal {...modalState.modalProps} show={modalState.showError} onHide={modalState.modalProps.onHide} />
            <SuccessModal {...modalState.modalProps} show={modalState.showSuccess} onHide={modalState.modalProps.onHide} />
        </div>
    );
};

export default ParametresSite;
