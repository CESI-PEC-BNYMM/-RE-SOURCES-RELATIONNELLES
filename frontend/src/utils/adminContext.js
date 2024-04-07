// Importation de React et de son hook createContext pour créer un contexte, et useState pour gérer l'état
import React, { createContext, useState } from 'react';

// Création du contexte pour l'administration avec une valeur initiale vide
export const AdminContext = createContext();

// Composant fournisseur pour le contexte AdminContext
export const AdminContextProvider = ({ children }) => {
    // Initialisation de l'état pour les utilisateurs avec deux utilisateurs par défaut
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
    ]);

    // Initialisation de l'état pour les rôles avec deux rôles par défaut
    const [roles, setRoles] = useState([
        { id: 1, name: 'Administrateur' },
        { id: 2, name: 'Utilisateur' },
    ]);

    // État pour gérer les notifications de l'application
    const [notification, setNotification] = useState(null);

    // Fonction pour ajouter un utilisateur à l'état
    const addUser = (user) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
    };

    // Fonction pour mettre à jour un utilisateur spécifique dans l'état
    const updateUser = (id, updatedUser) => {
        setUsers(users.map(user => user.id === id ? updatedUser : user));
    };

    // Fonction pour supprimer un utilisateur de l'état
    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Fonction pour ajouter un rôle à l'état
    const addRole = (role) => {
        setRoles([...roles, { ...role, id: roles.length + 1 }]);
    };

    // Fonction pour mettre à jour un rôle spécifique dans l'état
    const updateRole = (id, updatedRole) => {
        setRoles(roles.map(role => role.id === id ? updatedRole : role));
    };

    // Fonction pour supprimer un rôle de l'état
    const deleteRole = (id) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    // Fonction pour gérer les notifications. Définit une notification et la réinitialise après 5 secondes
    const setMessageNotification = (message) => {
        setNotification(message);
        setTimeout(() => setNotification(null), 5000);
    };

    // Rend le contexte disponible pour les composants enfants, passant les états et les fonctions comme valeurs
    return (
        <AdminContext.Provider value={{
            users, addUser, updateUser, deleteUser,
            roles, addRole, updateRole, deleteRole,
            notification, setMessageNotification
        }}>
            {children} // Rend les composants enfants qui consommeront ce contexte
        </AdminContext.Provider>
    );
};

// Exportation du fournisseur de contexte pour utilisation dans l'application
export default AdminContextProvider;
