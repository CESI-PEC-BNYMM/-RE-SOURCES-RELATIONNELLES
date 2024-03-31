import React, { createContext, useState } from 'react';

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
  ]);

  const [roles, setRoles] = useState([
    { id: 1, name: 'Administrateur' },
    { id: 2, name: 'Utilisateur' },
  ]);

  const [notification, setNotification] = useState(null);

  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };

  const updateUser = (id, updatedUser) => {
    setUsers(users.map(user => user.id === id ? updatedUser : user));
  };

  const deleteUser = (id) => {
    setUsers(users.filter(user => user.id !== id));
  };

  const addRole = (role) => {
    setRoles([...roles, { ...role, id: roles.length + 1 }]);
  };

  const updateRole = (id, updatedRole) => {
    setRoles(roles.map(role => role.id === id ? updatedRole : role));
  };

  const deleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  const setMessageNotification = (message) => {
    setNotification(message);
    // Ajouter un délai pour réinitialiser la notification après 5 secondes
    setTimeout(() => setNotification(null), 5000);
  };

  return (
    <AdminContext.Provider value={{
      users, addUser, updateUser, deleteUser,
      roles, addRole, updateRole, deleteRole,
      notification, setMessageNotification, // Ajouter notification et setMessageNotification ici
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
