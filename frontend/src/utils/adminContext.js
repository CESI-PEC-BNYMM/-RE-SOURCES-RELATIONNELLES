import React, { createContext, useState } from 'react';

// Création du contexte pour l'administration avec une valeur initiale
export const AdminContext = createContext();

export const AdminContextProvider = ({ children }) => {
    // État initial pour les utilisateurs et les rôles
    const [users, setUsers] = useState([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        
    ]);
    const [roles, setRoles] = useState([
        { id: 1, name: 'Administrateur' },
        { id: 2, name: 'Utilisateur' },
    ]);

    // État pour gérer les notifications
    const [notification, setNotification] = useState(null);

    // Fonctions pour manipuler l'état des utilisateurs.
    const addUser = (user) => {
        setUsers([...users, { ...user, id: users.length + 1 }]);
    };

    const updateUser = (id, updatedUser) => {
        setUsers(users.map(user => user.id === id ? updatedUser : user));
    };

    const deleteUser = (id) => {
        setUsers(users.filter(user => user.id !== id));
    };

    // Fonctions pour manipuler l'état des rôles.
    const addRole = (role) => {
        setRoles([...roles, { ...role, id: roles.length + 1 }]);
    };

    const updateRole = (id, updatedRole) => {
        setRoles(roles.map(role => role.id === id ? updatedRole : role));
    };

    const deleteRole = (id) => {
        setRoles(roles.filter(role => role.id !== id));
    };

    // Fonction pour gérer les notifications.
    const setMessageNotification = (message) => {
        setNotification(message);
        // Réinitialiser la notification après 5 secondes.
        setTimeout(() => setNotification(null), 5000);
    };

    // Le fournisseur du contexte rend l'état et les fonctions accessibles à travers l'application.
    return (
        <AdminContext.Provider value={{
            users, addUser, updateUser, deleteUser,
            roles, addRole, updateRole, deleteRole,
            notification, setMessageNotification
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
