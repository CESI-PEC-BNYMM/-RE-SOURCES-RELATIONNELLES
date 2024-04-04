import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from '../pages/admin/users/UserPage';
import RolePage from '../pages/admin/roles/RolePage';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const AdminRoutes = () => {
  const { isLoggedIn, isAdmin } = useContext(AuthContext);

  const AdminRoute = ({ children }) => {
    return isLoggedIn && isAdmin ? children : <Navigate to="/login" />;
  };

  return (
    <Routes>
      <Route path="/administration" element={<AdminLayout />}>
        {/* Utilisez AdminRoute comme wrapper pour vérifier l'accès administrateur */}
        <Route index element={<AdminRoute><UserPage /></AdminRoute>} />
        <Route path="utilisateurs" element={<AdminRoute><UserPage /></AdminRoute>} />
        <Route path="roles" element={<AdminRoute><RolePage /></AdminRoute>} />
        {/* Ajoutez d'autres routes administratives protégées ici si nécessaire */}
      </Route>
      {/* Redirection pour les utilisateurs non connectés ou non administrateurs */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
