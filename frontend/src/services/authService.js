
import config from "../utils/config";

const API_URL = config.API_URL; 

// Fonction pour connecter l'utilisateur
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
    // Renvoyer l'erreur pour une gestion cohérente dans le composant appelant
    return Promise.reject(error);
  }
};

// Fonction pour inscrire un nouvel utilisateur
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
      // Utilisez les données de réponse pour obtenir le message d'erreur
      const errorData = await response.json();
      return Promise.reject(errorData.message || 'Erreur lors de l\'inscription');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    // Renvoyer l'erreur pour une gestion cohérente dans le composant appelant
    return Promise.reject(error);
  }
};

export default { login, register };
