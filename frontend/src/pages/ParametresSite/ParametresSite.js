import React from 'react';
import { FaMoon } from "react-icons/fa";
import { useState, useEffect } from 'react';

const ParametresSite = () => {
    const [darkMode, setDarkMode] = useState(false);

    const handleDarkMode = () => {
        setDarkMode(!darkMode);
        localStorage.setItem('darkMode', !darkMode);
        if (!darkMode) {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }

    useEffect(() => {
        if (localStorage.getItem('darkMode') === 'true') {
            setDarkMode(true);
            document.documentElement.classList.add('dark-mode');
        }
    }, []);

    return (
        <div className="Content">
            <h4 className='mb-4'>Paramètres du site</h4>
            <div className="whiteBox p-4">
                <div className="d-flex w-100 align-items-start justify-content-between mb-4">
                    <div className="d-flex align-items-start w-50 flex-column">
                        <h5>Accessibilité</h5>
                        <div className="d-flex ml-3 mt-2 align-items-center">
                            <FaMoon style={{ fontSize: '1.3em', marginRight: '10px' }} />
                            <div class="form-check form-switch" style={{ userSelect: 'none' }}>
                                <label class="form-check-label" for="darkModeSwitcher">Mode sombre {darkMode ? 'activé' : 'désactivé'}</label>
                                <input class="form-check-input" type="checkbox" role="switch" id="darkModeSwitcher" onClick={handleDarkMode} checked={darkMode} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ParametresSite;
