import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importation des composants Routes et Route pour le routage dans React Router

import UserPage from './users/UserPage'; // Importation de la page des utilisateurs
import ManageArticles from './ManageArticles/ManageArticles';
import ManageCategories from './ManageCategories/ManageCategories';
import ManageCommentaires from './ManageCommentaires/ManageCommentaires';
import ManageTickets from './ManageTickets/ManageTickets';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <div className="admin-content">
        <Routes> 
          <Route path="utilisateurs" element={<UserPage />} /> 
          <Route path="articles" element={<ManageArticles />} />
          <Route path="categories" element={<ManageCategories />} />
          <Route path="commentaires" element={<ManageCommentaires />} />
          <Route path="tickets" element={<ManageTickets />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;
