import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../utils/authContext';
import ProfileForm from '../pages/ProfileForm';
import './UserProfile.css'; 

const getUserInfo = async (userId) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: userId,
        name: "Nom Utilisateur",
        email: "email@exemple.com",
      });
    }, 1000); 
  });
};

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Initialement à true pour le chargement
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userData = await getUserInfo(user?.id);
        setUserInfo(userData); 
      } catch (err) {
        setError(err.message); 
      } finally {
        setIsLoading(false); 
      }
    };

    if (user && user.id) {
      fetchUserInfo();
    }
  }, [user]); 

  const toggleEditMode = () => {
    setEditMode((prevEditMode) => !prevEditMode); 
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  // Gestion du rendu conditionnel basé sur `editMode`
  return (
    <div className="userProfileContainer">
      {!editMode ? (
        <div>
          <h2>Profil de {userInfo.name}</h2>
          <p>Email: {userInfo.email}</p>
          <button onClick={toggleEditMode}>Modifier le Profil</button>

          <div>
            <p>Espace personnel</p>
            <div id="dropdown-espace-personnel" className="userProfileDropdown">
              <NavLink to="/espace-personnel/mes-publications" className="menuItem">Mes publications</NavLink>
              <NavLink to="/espace-personnel/gestion-d-amis" className="menuItem">Gestion d'amis</NavLink>
            </div>
        </div>
        </div>
      ) : (
        <ProfileForm userInfo={userInfo} setUserInfo={setUserInfo} toggleEditMode={toggleEditMode} />
      )}
    </div>
  );
};

export default UserProfile;
