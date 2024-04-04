import React, { createContext, useState } from 'react';

// Création du contexte avec une valeur initiale nulle pour couvrir l'utilisateur, s'il est connecté, et s'il est administrateur.
export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialisation de l'état de l'utilisateur, de la vérification de connexion et du rôle d'administrateur.
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    // Définition des identifiants pour l'administrateur, utilisés pour la simulation d'une authentification.
    const adminCredentials = {
        email: 'admin@admin.com',
        password: 'admin'
    };

    // Fonction de connexion qui vérifie les identifiants et met à jour l'état en conséquence.
    const login = (email, password) => {
        if (email === adminCredentials.email && password === adminCredentials.password) {
            // Configuration pour un utilisateur administrateur.
            setUser({ email, role: 'admin' });
            setIsLoggedIn(true);
            setIsAdmin(true);
        } else {
            // Configuration pour un utilisateur standard.
            setUser({ email, role: 'user' });
            setIsLoggedIn(true);
            setIsAdmin(false);
        }
    };

    // Fonction de déconnexion qui réinitialise l'état.
    const logout = () => {
        setUser(null);
        setIsLoggedIn(false);
        setIsAdmin(false);
    };

    // Le fournisseur du contexte rend disponible l'état et les fonctions à travers l'arbre des composants.
    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
