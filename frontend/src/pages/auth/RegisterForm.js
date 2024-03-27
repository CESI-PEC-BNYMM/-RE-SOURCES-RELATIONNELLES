import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { register } from '../../services/authService'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';

// Schéma de validation Yup
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

  // Gère la soumission du formulaire
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await register(values);
      if (response.success) {
        toast.success('Inscription réussie. Veuillez-vous connecter !');
        navigate('/login'); // Redirection vers la page de connexion
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error('Erreur lors de l\'inscription :', error);
      toast.error('Une erreur s\'est produite. Veuillez réessayer.');
    }
    setSubmitting(false); // Fin de la soumission
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Header className="text-center bg-primary text-white">
              Page d'inscription
            </Card.Header>
            <Card.Body>
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
                {({ errors, touched }) => (
                  <Form>
                    <Row>
                      <Col md={6}>
                        <Field name="name" type="text" className="form-control" placeholder="Nom" />
                        <ErrorMessage name="name" component="div" className="text-danger" />
                      </Col>
                      <Col md={6}>
                        <Field name="prenom" type="text" className="form-control" placeholder="Prénom" />
                        <ErrorMessage name="prenom" component="div" className="text-danger" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field name="email" type="email" className="form-control" placeholder="Adresse e-mail" />
                        <ErrorMessage name="email" component="div" className="text-danger" />
                      </Col>
                      <Col md={6}>
                        <Field name="dateNaissance" type="date" className="form-control" placeholder="Date de naissance" />
                        <ErrorMessage name="dateNaissance" component="div" className="text-danger" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field name="telephone" type="text" className="form-control" placeholder="N° de téléphone" />
                        <ErrorMessage name="telephone" component="div" className="text-danger" />
                      </Col>
                      <Col md={6}>
                        <Field name="numeroSecuriteSociale" type="text" className="form-control" placeholder="N° de sécurité sociale" />
                        <ErrorMessage name="numeroSecuriteSociale" component="div" className="text-danger" />
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <Field name="password" type="password" className="form-control" placeholder="Mot de passe" />
                        <ErrorMessage name="password" component="div" className="text-danger" />
                      </Col>
                      <Col md={6}>
                        <Field name="confirmPassword" type="password" className="form-control" placeholder="Confirmer le mot de passe" />
                        <ErrorMessage name="confirmPassword" component="div" className="text-danger" />
                      </Col>
                    </Row>
                    <Button type="submit" className="mt-3 btn-block btn-primary">
                      Créer un compte
                    </Button>
                  </Form>
                )}
              </Formik>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterForm;
