import React, { createContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';



export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Fonction pour connecter l'utilisateur
  const login = (token) => {
    const decoded = jwtDecode(token);
    setUser(decoded.user);
    localStorage.setItem('token', token);
  };

  // Fonction pour déconnecter l'utilisateur
  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  // Vérifier si le token est dans le local storage et le valider
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      if (decoded.exp < currentTime) {
        logout();
      } else {
        setUser(decoded.user);
      }
    }
  }, []);

  // Valeurs et fonctions exposées par le contexte
  const contextValue = {
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
