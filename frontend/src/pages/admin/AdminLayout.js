import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importation des composants Routes et Route pour le routage dans React Router

import UserPage from './users/UserPage'; // Importation de la page des utilisateurs

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <Routes> 
          <Route path="utilisateurs" element={<UserPage />} /> 
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
