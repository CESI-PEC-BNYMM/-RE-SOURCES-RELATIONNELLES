import React, { createContext, useState } from 'react';

// Création du contexte AuthContext avec une valeur initiale pour définir les propriétés par défaut.
export const AuthContext = createContext({
  user: null, // Utilisateur actuellement connecté, null par défaut
  isLoggedIn: false, // État de connexion, false par défaut
  isAdmin: false, // Indique si l'utilisateur connecté est un administrateur
  login: () => {}, // Fonction pour se connecter (sera définie plus tard)
  logout: () => {}, // Fonction pour se déconnecter
});

// Composant fournisseur AuthProvider qui encapsule toute la logique d'authentification.
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // État pour garder les informations de l'utilisateur connecté
    const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour vérifier si l'utilisateur est connecté
    const [isAdmin, setIsAdmin] = useState(false); // État pour vérifier si l'utilisateur est un administrateur

    // Informations d'identification de l'administrateur pour la simulation de l'authentification
    const adminCredentials = {
        email: 'admin@admin.com',
        password: 'admin'
    };

    // Fonction de connexion qui vérifie les identifiants et met à jour l'état en conséquence
    const login = (email, password) => {
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Si les identifiants correspondent à ceux de l'administrateur, définir l'utilisateur comme admin
            setUser({ id: 1, email, role: 'admin' });
            setIsLoggedIn(true);
            setIsAdmin(true);
        } else {
            // Si les identifiants ne correspondent pas, définir l'utilisateur comme un utilisateur normal
            setUser({ id: 2, email, role: 'user' });
            setIsLoggedIn(true);
            setIsAdmin(false);
        }
    };

    // Fonction de déconnexion qui réinitialise tous les états liés à l'utilisateur
    const logout = () => {
        setUser(null); // Réinitialise les informations de l'utilisateur
        setIsLoggedIn(false); // Réinitialise l'état de connexion
        setIsAdmin(false); // Réinitialise l'état d'administrateur
    };

    // Rendu du contexte avec les valeurs et fonctions disponibles pour les composants enfants
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
            {children} // Rend les composants enfants en passant le contexte
        </AuthContext.Provider>
    );
};
