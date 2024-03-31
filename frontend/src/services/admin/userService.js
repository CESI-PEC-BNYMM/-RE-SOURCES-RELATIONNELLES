// userService.js
import config from "../../utils/config";

const API_URL = config.API_URL; 

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      return Promise.reject('Erreur d\'authentification');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.message || 'Erreur lors de l\'inscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const saveNewUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.message || 'Erreur lors de l\'ajout de l\'utilisateur');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updateUser = async (userId, userData) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.message || 'Erreur lors de la mise à jour de l\'utilisateur');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      return Promise.reject(errorData.message || 'Erreur lors de la suppression de l\'utilisateur');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    return Promise.reject(error);
  }
};

// Fonction factice pour simuler la récupération de tous les utilisateurs
export const getAllUsers = async () => {
  // Simuler un délai réseau
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Données factices d'utilisateurs
  const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com' }
  ];

  return mockUsers;
};
