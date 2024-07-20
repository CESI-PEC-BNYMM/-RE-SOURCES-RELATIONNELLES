import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import ErrorModal from '../../components/ErrorModal/ErrorModal';
import SuccessModal from '../../components/SuccessModal/SuccessModal';
import axios from 'axios';

// Schéma de validation pour le formulaire d'inscription avec Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  prenom: Yup.string().required('Le prénom est requis'),
  email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
  dateNaissance: Yup.date().required('La date de naissance est requise'),
  telephone: Yup.string().required('Le numéro de téléphone est requis'),
  numeroSecuriteSociale: Yup.string().required('Le numéro de sécurité sociale est requis'),
  sexe: Yup.string().required('Le sexe est requis'),
  ville: Yup.string().required('La ville est requise'),
  codePostal: Yup.string().required('Le code postal est requis'),
  password: Yup.string()
    .required('Le mot de passe est requis')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
});

const RegisterForm = () => {
  useEffect(() => {
    document.title = '(RE) – Inscription';
  }, []);

  const navigate = useNavigate();
  const api_url = process.env.REACT_APP_API_URI + '/api';
  const [showErrorModal, setShowErrorModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [showSuccessModal, setShowSuccessModal] = React.useState(false);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const queryParams = new URLSearchParams({
        mail: values.email,
        motDePasse: values.password,
        nom: values.name,
        prenom: values.prenom,
        numTel: values.telephone,
        numSec: values.numeroSecuriteSociale,
        dateNaissance: new Date(values.dateNaissance).toLocaleDateString('fr-FR'),
        sexe: values.sexe,
        codePostal: values.codePostal,
        ville: values.ville
      }).toString();
      const response = await axios.post(`${api_url}/auth/signup?${queryParams}`);
      if (response.status === 201) {
        setShowSuccessModal(true);
        setTimeout(() => {
          setShowSuccessModal(false);
          navigate('/login');
        }, 3000);
      }
    } catch (error) {
      setErrorMessage('Informations : ' + error.response.data.error + ' (Code erreur : ' + error.response.data.status + ')');
      setShowErrorModal(true);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className='Content mt-5'>
      <div className='row'>
        <div className="col-md-6 offset-md-3">
          <h2 className='text-center'>Inscription</h2>
          <Formik
            initialValues={{
              name: '',
              prenom: '',
              email: '',
              dateNaissance: '',
              telephone: '',
              numeroSecuriteSociale: '',
              sexe: '',
              ville: '',
              codePostal: '',
              password: '',
              confirmPassword: ''
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor="name">Nom</label>
                    <Field name="name" type="text" className="form-control" />
                    <ErrorMessage name="name" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='prenom'>Prénom</label>
                    <Field name="prenom" type="text" className="form-control" />
                    <ErrorMessage name="prenom" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='email'>Adresse e-mail</label>
                    <Field name="email" type="email" className="form-control" />
                    <ErrorMessage name="email" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='dateNaissance'>Date de naissance</label>
                    <Field name="dateNaissance" type="date" className="form-control" />
                    <ErrorMessage name="dateNaissance" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='telephone'>N° de téléphone</label>
                    <Field name="telephone" type="text" className="form-control" />
                    <ErrorMessage name="telephone" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='numeroSecuriteSociale'>N° de sécurité sociale</label>
                    <Field name="numeroSecuriteSociale" type="text" className="form-control" />
                    <ErrorMessage name="numeroSecuriteSociale" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='sexe'>Sexe</label>
                    <Field as="select" name="sexe" className="form-control">
                      <option value="" label="Sélectionnez le sexe" />
                      <option value="H" label="Homme" />
                      <option value="F" label="Femme" />
                    </Field>
                    <ErrorMessage name="sexe" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='ville'>Ville</label>
                    <Field name="ville" type="text" className="form-control" />
                    <ErrorMessage name="ville" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='codePostal'>Code Postal</label>
                    <Field name="codePostal" type="text" className="form-control" />
                    <ErrorMessage name="codePostal" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='password'>Mot de passe</label>
                    <Field name="password" type="password" className="form-control" />
                    <ErrorMessage name="password" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
                <Col md={6}>
                  <div className="form-group">
                    <label htmlFor='confirmPassword'>Confirmer le mot de passe</label>
                    <Field name="confirmPassword" type="password" className="form-control" />
                    <ErrorMessage name="confirmPassword" component="div" className="alert alert-danger mt-2" />
                  </div>
                </Col>
              </Row>
              <Button type="submit" className="mt-3 btn-block btn-primary">Créer un compte</Button>
            </Form>
          </Formik>
        </div>
      </div>
      <ErrorModal show={showErrorModal} onHide={() => setShowErrorModal(false)} message={'Une erreur est survenue lors de l\'inscription'} title={'Erreur'} details={errorMessage} />
      <SuccessModal show={showSuccessModal} onHide={() => navigate('/login')} message={'Inscription réussie. Vous allez être redirigé vers la page de connexion'} title={'Inscription réussie'} />
    </div>
  );
};

export default RegisterForm;
