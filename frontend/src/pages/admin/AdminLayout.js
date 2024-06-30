import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importation des composants Routes et Route pour le routage dans React Router

import UserPage from './users/UserPage'; // Importation de la page des utilisateurs
import RolePage from './roles/RolePage'; // Importation de la page des rôles
import ManageArticles from './ManageArticles/ManageArticles';



const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <Routes> 
          <Route path="utilisateurs" element={<UserPage />} /> 
          <Route path="roles" element={<RolePage />} /> 
          <Route path="articles" element={<ManageArticles />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

