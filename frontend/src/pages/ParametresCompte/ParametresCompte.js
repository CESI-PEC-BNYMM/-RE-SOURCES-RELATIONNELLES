import React, { useState } from 'react';
import './ParametresCompte.css';

function ParametresCompte() {
  const [userInfo, setUserInfo] = useState({
    nom: '',
    prenom: '',
    numeroTelephone: '',
    ville: '',
    codePostal: '',
    email: '',
    dateDeNaissance: '',
    numeroSecu: '',
    motDePasseActuel: '',
    nouveauMotDePasse: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted", userInfo);
    // Ajouter ici la logique pour envoyer les informations au backend
  };

  return (
    <div className='infoPersoContainer'>
      <div className="infoPersoHeader">
        <p>Paramètres du compte</p>
      </div>
      <form onSubmit={handleSubmit} className="infosPersoForm">
        <div>
          <label htmlFor='nom'>Nom:</label>
          <input type="text" name="nom" value={userInfo.nom} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='prenom'>Prénom:</label>
          <input type="text" name="prenom" value={userInfo.prenom} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='numeroTelephone'>Numéro de téléphone:</label>
          <input type="text" name="numeroTelephone" value={userInfo.numeroTelephone} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='ville'>Ville:</label>
          <input type="text" name="ville" value={userInfo.ville} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='codePostal'>Code Postal:</label>
          <input type="text" name="codePostal" value={userInfo.codePostal} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='email'>Email:</label>
          <input type="email" name="email" value={userInfo.email} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='dateDeNaissance'>Date de naissance:</label>
          <input type="date" name="dateDeNaissance" value={userInfo.dateDeNaissance} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='numeroSecu'>Numéro de sécurité sociale:</label>
          <input type="text" name="numeroSecu" value={userInfo.numeroSecu} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='motDePasseActuel'>Mot de passe actuel:</label>
          <input type="password" name="motDePasseActuel" value={userInfo.motDePasseActuel} onChange={handleChange} />
        </div>
        <div>
          <label htmlFor='nouveauMotDePasse'>Nouveau mot de passe:</label>
          <input type="password" name="nouveauMotDePasse" value={userInfo.nouveauMotDePasse} onChange={handleChange} />
        </div>
        <button type="submit" className="submit-button">Enregistrer</button>
      </form>
    </div>
  );
}

export default ParametresCompte;
