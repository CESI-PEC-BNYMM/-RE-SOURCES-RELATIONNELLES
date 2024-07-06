import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import UserPage from '../pages/admin/users/UserPage';
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
  
        <Route index element={<AdminRoute><UserPage /></AdminRoute>} />
        <Route path="utilisateurs" element={<AdminRoute><UserPage /></AdminRoute>} />
       
       
      </Route>
      
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
