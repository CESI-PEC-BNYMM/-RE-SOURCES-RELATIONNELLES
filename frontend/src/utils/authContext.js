import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  
  const adminCredentials = {
    email: 'admin@admin.com',
    password: 'admin'
  };

  const login = (email, password) => {
    if (email === adminCredentials.email && password === adminCredentials.password) {
      setUser({ email, role: 'admin' }); // Définir le rôle comme admin
      setIsLoggedIn(true);
      setIsAdmin(true);
    } else {
      setUser({ email, role: 'user' });
      setIsLoggedIn(true);
      setIsAdmin(false);
    }
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
