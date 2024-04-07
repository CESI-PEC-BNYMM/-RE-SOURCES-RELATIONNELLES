import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importation des composants Routes et Route pour le routage dans React Router
import SidebarsPage from './sidebars/SidebarsPage'; // Importation du composant de barre latérale

import UserPage from './users/UserPage'; // Importation de la page des utilisateurs
import RolePage from './roles/RolePage'; // Importation de la page des rôles



const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <SidebarsPage /> // Composant de la barre latérale pour la navigation
      <div className="admin-content">
        <Routes> // Définition des routes pour la partie du contenu administratif
          <Route path="utilisateurs" element={<UserPage />} /> // Route pour la page des utilisateurs
          <Route path="roles" element={<RolePage />} /> // Route pour la page des rôles

        </Routes>
      </div>
    </div>
  );
};

export default AdminLayout;

