// Importation des hooks nécessaires de React et des librairies externes
import React, { useContext } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup'; // Pour la validation de formulaire
import { useNavigate, useLocation } from 'react-router-dom'; // Hooks de React Router pour la navigation
import { AuthContext } from '../../utils/authContext'; // Contexte d'authentification

// Définition du composant LoginForm
const LoginForm = () => {
  // Accès à la fonction login à partir du contexte d'authentification
  const { login } = useContext(AuthContext);
  // Hooks pour la navigation et accès à l'état de la route actuelle
  const navigate = useNavigate();
  const location = useLocation();

  // Fonction de soumission du formulaire
  const handleSubmit = (values, { setSubmitting }) => {
    // Appel à la fonction login avec les valeurs du formulaire
    login(values.email, values.password);
    // Fin de l'indication de soumission
    setSubmitting(false);
    // Redirection vers la page de profil après connexion
    navigate('/fil-d-actualite');
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
    </div>
  );
};

export default LoginForm; // Exportation du composant pour une utilisation dans d'autres parties de l'application
