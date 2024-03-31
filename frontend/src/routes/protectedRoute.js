// ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../utils/authContext'; // Assurez-vous que le chemin est correct

const ProtectedRoute = ({ element: Component, path }) => {
  const { isAdmin, isLoggedIn } = useContext(AuthContext);

  return isLoggedIn && isAdmin ? (
    <Route path={path} element={Component} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default ProtectedRoute;
