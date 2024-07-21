import React, { useEffect, useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';
import ErrorModal from '../../../components/ErrorModal/ErrorModal';
import axios from 'axios';

const GestionAmis = () => {
    useEffect(() => {
        document.title = '(RE) – Gestion d\'amis';
    }, []);

    const [amis, setAmis] = useState([]);
    const [amisShown, setAmisShown] = useState([]);
    const [demandes, setDemandes] = useState([]);
    const [demandesShown, setDemandesShown] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const filterBy = () => true;
    const [selection, setSelection] = useState([]);

    const api_url = process.env.REACT_APP_API_URI + '/api';
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        fetchFriends();
    }, []);

    useEffect(() => {
        setAmisShown([...amis.slice(0, 10)]);
    }, [amis]);

    useEffect(() => {
        setDemandesShown([...demandes.slice(0, 10)]);
    }, [demandes]);

    const fetchFriends = async () => {
        try {
            const headers = {
                Authorization: 'Bearer ' + localStorage.getItem('token'),
            };
            const response = await axios.get(`${api_url}/demandeAmi/list/`, { headers: headers });
            console.log(response.data);
            const requests = response.data.map((d) => ({ nom: d.prenom + ' ' + d.nom, idDemandeAmi: d.idDemandeAmi }));
            setDemandes(requests);
            const friends = response.data.filter((d) => d.demandeValidee).map((d) => ({ nom: d.prenom + ' ' + d.nom, idDemandeAmi: d.idDemandeAmi }));
            setAmis(friends);
        } catch (error) {
            setErrorMessage('Informations : ' + error.response.data + ' (Code erreur : ' + error.response.status + ')');
            setShowErrorModal(true);
            console.log(error);
        }
    };

    const handleSearch = async (query) => {
        setIsLoading(true);
        try {
            const response = await axios.get(`${api_url}/citoyen/search?query=${query}`);
            console.log(response.data);

            const formattedOptions = response.data.map((citoyen) => ({
                id: citoyen.mail, // or a unique identifier
                login: `${citoyen.prenom} ${citoyen.nom}`,
                avatar_url: 'https://randomuser.me/api/portraits/thumb/men/1.jpg', // placeholder or actual image URL
            }));

            setOptions(formattedOptions);
            setIsLoading(false);
        } catch (error) {
            setErrorMessage(`Informations : ${error.response.data.error} (Code erreur : ${error.response.data.status})`);
            setShowErrorModal(true);
            console.log(error);
            setIsLoading(false);
        }
    };

    const addProfiles = (profiles, profilesShown, setProfilesShown) => {
        const newProfiles = profiles.slice(profilesShown.length, profilesShown.length + 10);
        setProfilesShown([...profilesShown, ...newProfiles]);
    };

    const removeFriend = (ami) => {
        if (window.confirm('Voulez-vous vraiment supprimer ' + ami.nom + ' de vos amis ?')) {
            alert(ami.nom + ' n\'est plus votre ami(e).');
            setAmis(amis.filter((a) => a !== ami));
            setAmisShown(amisShown.filter((a) => a !== ami));
        }
    }

    const addRequest = (demande) => {
        alert(demande.nom + ' est maintenant votre ami !');
        setAmis([...amis, { nom: demande.nom }]);
        setAmisShown([...amisShown, { nom: demande.nom }]);
        setDemandes(demandes.filter((d) => d !== demande));
        setDemandesShown(demandesShown.filter((d) => d !== demande));
    }

    const removeRequest = (demande) => {
        if (window.confirm('Voulez-vous vraiment refuser la demande d\'ami de ' + demande.nom + ' ?')) {
            alert('Demande de ' + demande.nom + ' refusée.');
            setDemandes(demandes.filter((d) => d !== demande));
            setDemandesShown(demandesShown.filter((d) => d !== demande));
            setDemandes(demandes.filter((d) => d !== demande));
            setDemandesShown(demandesShown.filter((d) => d !== demande));
        }
    }

    const formatImage = ($image, $size) => {
        return (
            <img src={$image} alt='user' style={{ width: $size, height: $size, borderRadius: '50%' }} />
        );
    };

    return (
        <div className="Content GestionAmis">
            <h4 className="mb-4">Gestion d'amis</h4>
            <div className="Container d-flex justify-content-between flex-row flex-wrap">
                <div className="Amis whiteBox d-flex flex-column align-items-start mb-3" style={{ width: '49%' }}>
                    <div className="d-flex gap-3 align-items-center mb-4">
                        <h5>Amis ({amis.length})</h5>
                        <AsyncTypeahead
                            filterBy={filterBy}
                            id="RechercheUtilisateur"
                            isLoading={isLoading}
                            labelKey="login"
                            minLength={3}
                            onSearch={handleSearch}
                            options={options}
                            placeholder="Rechercher un utilisateur..."
                            onChange={setSelection}
                            selected={selection}
                            renderMenuItemChildren={(option) => (
                                <>
                                    <img
                                        alt={option.login}
                                        src={option.avatar_url}
                                        style={{
                                            height: '24px',
                                            marginRight: '10px',
                                            width: '24px',
                                        }}
                                    />
                                    <span>{option.login}</span>
                                </>
                            )}
                        />
                        {
                            selection.length > 0 && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        alert(selection[0].login + ' est maintenant votre ami !');
                                        setAmis([...amis, { nom: selection[0].login }]);
                                        setSelection([]);
                                    }}
                                >
                                    Ajouter
                                </button>
                            )
                        }
                    </div>
                    <div className="d-flex flex-column justify-content-between flex-wrap w-100">
                        {amisShown.map((ami, index) => (
                            <div className='Ami d-flex justify-content-between align-items-start flex-wrap' key={index}>
                                <div className='Profile d-flex align-items-center mb-2 flex-wrap'>
                                    {formatImage(("https://picsum.photos/200/200?random=1" + index), 50)}
                                    <div className='ProfileInfos d-flex flex-column align-items-start ms-3'>
                                        <h6>{ami.nom}</h6>
                                    </div>
                                </div>
                                <button className="btn btn-danger" onClick={() => removeFriend(ami)}>Supprimer</button>
                            </div>
                        ))
                        }
                    </div>
                    {amis.length === amisShown.length ? <p>Fin de la liste, pourquoi ne pas ajouter de nouveaux amis ?<br /><a href="#">Retour en haut de la page</a></p> : null}
                    {amis.length !== amisShown.length ? <button className="btn btn-primary btn-sm" onClick={() => addProfiles(amis, amisShown, setAmisShown)}>Voir plus</button> : null}
                </div>
                <div className="Demandes whiteBox d-flex flex-column align-items-start mb-3" style={{ width: '49%' }}>
                    <div className="d-flex gap-3 align-items-center mb-4">
                        <h5>Demandes d'amis ({demandes.length})</h5>
                    </div>
                    <div className="d-flex flex-column justify-content-between flex-wrap w-100">
                        {demandesShown.map((demande, index) => (
                            <div className='Demande d-flex justify-content-between align-items-start flex-wrap' key={index}>
                                <div className='Profile d-flex align-items-center mb-2 flex-wrap'>
                                    {formatImage(("https://picsum.photos/200/200?random=" + index), 50)}
                                    <div className='ProfileInfos d-flex flex-column align-items-start ms-3'>
                                        <h6>{demande.nom}</h6>
                                    </div>
                                </div>
                                <div className='d-flex gap-3 flex-wrap'>
                                    <button className="btn btn-success" onClick={() => addRequest(demande)}>Accepter</button>
                                    <button className="btn btn-danger" onClick={() => removeRequest(demande)}>Refuser</button>
                                </div>
                            </div>
                        ))
                        }
                    </div>
                    {demandes.length === demandesShown.length ? <p>C'est tout pour aujourd'hui !<br /><a href="#">Retour en haut de la page</a></p> : null}
                    {demandes.length !== demandesShown.length ? <button className="btn btn-primary btn-sm" onClick={() => addProfiles(demandes, demandesShown, setDemandesShown)}>Voir plus</button> : null}
                </div>
            </div>

            <ErrorModal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                title="Erreur"
                message={errorMessage}
            />
        </div>
    );
}

export default GestionAmis;
