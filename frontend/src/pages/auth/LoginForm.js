// Importation des hooks nécessaires de React et des librairies externes
import React, { useContext, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Pour la validation de formulaire
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks de React Router pour la navigation
import { AuthContext } from '../../utils/authContext'; // Contexte d'authentification
import axios from 'axios'; // Pour les requêtes HTTP
import ErrorModal from '../../components/ErrorModal/ErrorModal';

// Définition du composant LoginForm
const LoginForm = () => {
  useEffect(() => {
    document.title = '(RE) – Connexion';
  }, []);

  // Accès à la fonction login à partir du contexte d'authentification
  const { login } = useContext(AuthContext);
  // Hooks pour la navigation et accès à l'état de la route actuelle
  const navigate = useNavigate();
  const location = useLocation();
  const api_url = process.env.REACT_APP_API_URI + '/api';
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  // Fonction de soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const queryParams = new URLSearchParams({
        mail: values.email,
        motDePasse: values.password
      }).toString();
      const response = await axios.post(`${api_url}/auth/login?${queryParams}`);
      console.log(response);
      if (response.status === 200 && !response.data.includes('incorrect')) {
        login(response.data.token); // Connexion de l'utilisateur avec le token reçu
        const { from } = location.state || { from: { pathname: '/' } };
        navigate(from); // Redirection vers la page précédente
      }

      //TODO : Temporaire, à remplacer par une gestion d'erreur plus propre
      if (response.data.includes('incorrect')) {
        setErrorMessage('Informations : ' + response.data + ' (Code erreur : ' + response.status + ')');
        setShowErrorModal(true);
      }
    } catch (error) {
      setErrorMessage('Informations : ' + error.response.data.error + ' (Code erreur : ' + error.response.data.status + ')');
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  };

  // Rendu du composant, structure du formulaire avec Formik
  return (
    <div className="Content mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Connexion</h2>
          <Formik
            initialValues={{ email: '', password: '' }} // Valeurs initiales du formulaire
            validationSchema={Yup.object({ // Schéma de validation avec Yup
              email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
              password: Yup.string().required('Le mot de passe est requis'),
            })}
            onSubmit={handleSubmit} // Fonction de soumission liée à Formik
          >
            <Form>
              <div className="form-group">
                <label htmlFor="email">Adresse e-mail</label>
                <Field name="email" type="email" className="form-control" />
                <ErrorMessage name="email" component="div" className="alert alert-danger mt-2" />
              </div>

              <div className="form-group">
                <label htmlFor="password">Mot de passe</label>
                <Field name="password" type="password" className="form-control" />
                <ErrorMessage name="password" component="div" className="alert alert-danger mt-2" />
              </div>

              <button type="submit" className="btn btn-primary mt-3">Se connecter</button>
            </Form>
          </Formik>
        </div>
      </div>

      <ErrorModal
        show={showErrorModal}
        onHide={() => setShowErrorModal(false)}
        title="Erreur de connexion"
        message={errorMessage}
      />

    </div>
  );
};

export default LoginForm; // Exportation du composant pour une utilisation dans d'autres parties de l'application
