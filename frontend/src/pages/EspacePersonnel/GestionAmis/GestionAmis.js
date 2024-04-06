import React, { useState } from 'react';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { AsyncTypeahead } from 'react-bootstrap-typeahead';

const GestionAmis = () => {
    const [amis, setAmis] = useState([
        { nom: 'Jean Dupont', date: '01/01/2021' },
        { nom: 'Marie Durand', date: '01/01/2021' },
        { nom: 'Paul Martin', date: '01/01/2021' },
        { nom: 'Sophie Lefevre', date: '01/01/2021' },
        { nom: 'Jacques Lemoine', date: '01/01/2021' },
        { nom: 'Jeanne Lefevre', date: '01/01/2021' },
        { nom: 'Pierre Lemoine', date: '01/01/2021' },
        { nom: 'Julie Dupont', date: '01/01/2021' },
        { nom: 'Lucie Durand', date: '01/01/2021' },
        { nom: 'Marc Martin', date: '01/01/2021' },
        { nom: 'Hélène Lefevre', date: '01/01/2021' },
        { nom: 'Philippe Lemoine', date: '01/01/2021' },
        { nom: 'Marie Dupont', date: '01/01/2021' },
        { nom: 'Paul Durand', date: '01/01/2021' },
        { nom: 'Sophie Martin', date: '01/01/2021' },
        { nom: 'Jacques Lefevre', date: '01/01/2021' },
        { nom: 'Jeanne Lemoine', date: '01/01/2021' },
        { nom: 'Pierre Dupont', date: '01/01/2021' },
        { nom: 'Julie Durand', date: '01/01/2021' },
        { nom: 'Lucie Martin', date: '01/01/2021' },
        { nom: 'Marc Lefevre', date: '01/01/2021' },
        { nom: 'Hélène Lemoine', date: '01/01/2021' },
        { nom: 'Philippe Dupont', date: '01/01/2021' },
        { nom: 'Marie Durand', date: '01/01/2021' },
        { nom: 'Paul Martin', date: '01/01/2021' },
        { nom: 'Sophie Lefevre', date: '01/01/2021' },
        { nom: 'Jacques Lemoine', date: '01/01/2021' },
        { nom: 'Jeanne Lefevre', date: '01/01/2021' },
        { nom: 'Pierre Lemoine', date: '01/01/2021' }
    ]);
    const [amisShown, setAmisShown] = useState([...amis.slice(0, 10)]);
    const [demandes, setDemandes] = useState([
        { nom: 'Jeanne Lefevre', date: '01/01/2021' },
        { nom: 'Pierre Lemoine', date: '01/01/2021' },
        { nom: 'Julie Dupont', date: '01/01/2021' },
        { nom: 'Lucie Durand', date: '01/01/2021' },
        { nom: 'Marc Martin', date: '01/01/2021' },
        { nom: 'Hélène Lefevre', date: '01/01/2021' },
        { nom: 'Philippe Lemoine', date: '01/01/2021' },
        { nom: 'Marie Dupont', date: '01/01/2021' },
        { nom: 'Paul Durand', date: '01/01/2021' },
        { nom: 'Sophie Martin', date: '01/01/2021' },
        { nom: 'Jacques Lefevre', date: '01/01/2021' },
        { nom: 'Jeanne Lemoine', date: '01/01/2021' },
        { nom: 'Pierre Dupont', date: '01/01/2021' },
        { nom: 'Julie Durand', date: '01/01/2021' },
        { nom: 'Lucie Martin', date: '01/01/2021' },
        { nom: 'Marc Lefevre', date: '01/01/2021' },
        { nom: 'Hélène Lemoine', date: '01/01/2021' },
        { nom: 'Philippe Dupont', date: '01/01/2021' },
        { nom: 'Marie Durand', date: '01/01/2021' },
        { nom: 'Paul Martin', date: '01/01/2021' },
        { nom: 'Sophie Lefevre', date: '01/01/2021' },
        { nom: 'Jacques Lemoine', date: '01/01/2021' }
    ]);
    const [demandesShown, setDemandesShown] = useState([...demandes.slice(0, 10)]);
    const [isLoading, setIsLoading] = useState(false);
    const [options, setOptions] = useState([]);
    const filterBy = () => true;
    const [selection, setSelection] = useState([]);

    const handleSearch = (query) => {
        setIsLoading(true);

        fetch(`${process.env.REACT_APP_SEARCH_USERS_URI}?q=${query}+in:login&page=1&per_page=50`)
            .then((resp) => resp.json())
            .then(({ items }) => {
                setOptions(items);
                setIsLoading(false);
            });
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

    const formatDate = (date) => {
        return date.split('T')[0].split('-').reverse().join('/');
    }

    const addRequest = (demande) => {
        alert(demande.nom + ' est maintenant votre ami !');
        setAmis([...amis, { nom: demande.nom, date: formatDate(new Date().toISOString()) }]);
        setAmisShown([...amisShown, { nom: demande.nom, date: formatDate(new Date().toISOString()) }]);
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

    return (
        <div className="Content">
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
                                        setAmis([...amis, { nom: selection[0].login, date: formatDate(new Date().toISOString()) }]);
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
                                <div className='Profile d-flex align-items-start flex-wrap'>
                                    <img src='https://picsum.photos/200' alt='Profile' />
                                    <div className='ProfileInfos d-flex flex-column align-items-start'>
                                        <h6>{ami.nom}</h6>
                                        <p>Depuis le {ami.date}</p>
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
                                <div className='Profile d-flex align-items-start'>
                                    <img src='https://picsum.photos/200' alt='Profile' />
                                    <div className='ProfileInfos d-flex flex-column align-items-start'>
                                        <h6>{demande.nom}</h6>
                                        <p>Depuis le {demande.date}</p>
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
        </div>
    );
}

export default GestionAmis;
