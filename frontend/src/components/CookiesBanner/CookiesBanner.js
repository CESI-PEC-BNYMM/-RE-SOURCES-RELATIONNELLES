import React from 'react';
import { useState } from 'react';
import './CookiesBanner.css';
import { NavLink } from 'react-router-dom';

const CookiesBanner = ({ setCookies }) => {
    const [showModal, setShowModal] = useState(false);
    const [cookiesChoice, setCookiesChoice] = useState([
        { key: 'test', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.', state: 'true' },
        { key: 'test2', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.', state: 'true' },
        { key: 'test3', description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.', state: 'true' },
    ]);

    const handleCookieChange = (key) => {
        setCookiesChoice(cookiesChoice.map(cookie => cookie.key === key ? { key: cookie.key, description: cookie.description, state: cookie.state === 'true' ? 'false' : 'true' } : cookie));
    };

    return (
        <div className="cookiesBanner d-flex justify-content-center align-items-center flex-column gap-3">
            <p className='user-select-none'>Ce site utilise des cookies pour améliorer votre expérience. Vous pouvez choisir d'accepter tous les cookies, de refuser tous les cookies ou de gérer vos préférences en matière de cookies.</p>
            <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>Personnaliser mes choix</button>
                <button className='btn btn-danger' onClick={() => setCookies(cookiesChoice.map(cookie => ({ ...cookie, state: 'false' })))}>Tout refuser</button>
                <button className='btn btn-success' onClick={() => setCookies(cookiesChoice.map(cookie => ({ ...cookie, state: 'true' })))}>Tout accepter</button>
            </div>
            <small className='user-select-none'>En continuant à utiliser ce site, vous acceptez notre utilisation des cookies conformément à notre  <NavLink to='/rgpd' style={{ color: 'white' }}> Politique de confidentialité</NavLink>.</small>
            {showModal && (
                <div className="Modal">
                    <div className="ModalContent">
                        <div className="ModalHeader">
                            <h2>Personnaliser mes choix</h2>
                            <button className="btn-close" onClick={() => setShowModal(false)}></button>
                        </div>
                        <div className="d-flex flex-column gap-3" style={{ maxHeight: '60%', overflowY: 'auto' }}>
                            {cookiesChoice.map((cookie) => (
                                <div key={cookie.key} className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" id={cookie.key} checked={cookie.state === 'true'} onChange={() => handleCookieChange(cookie.key)} />
                                    <label className="form-check-label" htmlFor={cookie.key}><b>{cookie.key}</b> - <i>{cookie.description}</i></label>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-between w-100 flex-wrap">
                            <button className="btn btn-primary" onClick={() => setCookies(cookiesChoice)}>Enregistrer mes choix</button>
                            <div className='d-flex gap-3'>
                                <button className="btn btn-danger" onClick={() => setCookies(cookiesChoice.map(cookie => ({ ...cookie, state: 'false' })))}>Tout refuser</button>
                                <button className="btn btn-success" onClick={() => setCookies(cookiesChoice.map(cookie => ({ ...cookie, state: 'true' })))}>Tout accepter</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CookiesBanner;
