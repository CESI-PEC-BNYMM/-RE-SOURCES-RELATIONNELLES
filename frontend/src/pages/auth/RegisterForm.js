import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Schéma de validation pour le formulaire d'inscription avec Yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required('Le nom est requis'),
  prenom: Yup.string().required('Le prénom est requis'),
  email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
  dateNaissance: Yup.date().required('La date de naissance est requise'),
  telephone: Yup.string().required('Le numéro de téléphone est requis'),
  numeroSecuriteSociale: Yup.string().required('Le numéro de sécurité sociale est requis'),
  password: Yup.string()
    .required('Le mot de passe est requis')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[\s\S]{6,}$/,
      'Le mot de passe doit contenir au moins 6 caractères, une majuscule, une minuscule et un chiffre'
    ),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Les mots de passe doivent correspondre')
});

const RegisterForm = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = { ...values, id: users.length + 1, role: 'user' };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));

      toast.success('Inscription réussie. Veuillez-vous connecter !');
      navigate('/login');
      setSubmitting(false);
    }, 400);
  };

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
    </div>
  );
};

export default RegisterForm;
