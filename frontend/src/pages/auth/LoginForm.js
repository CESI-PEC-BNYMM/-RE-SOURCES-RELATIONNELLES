import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center">Connexion</h2>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={Yup.object({
              email: Yup.string().email('Adresse e-mail invalide').required('Champ obligatoire'),
              password: Yup.string().required('Le mot de passe est requis'),
            })}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
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

export default LoginForm;
