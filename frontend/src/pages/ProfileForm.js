import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProfileForm = ({ userInfo, setUserInfo, toggleEditMode }) => {
  return (
    <Formik
      initialValues={{ name: userInfo.name, email: userInfo.email }}
      validationSchema={Yup.object({
        name: Yup.string().required('Le nom est requis.'),
        email: Yup.string().email('Email invalide.').required('L\'email est requis.'),
        
      })}
      onSubmit={(values, { setSubmitting }) => {
        // Ici, vous mettriez à jour les infos de l'utilisateur dans la base de données
        setUserInfo(values);
        toggleEditMode();
        setSubmitting(false);
      }}
    >
      <Form>
        <label htmlFor="name">Nom</label>
        <Field name="name" type="text" />
        <ErrorMessage name="name" />

        <label htmlFor="email">Email</label>
        <Field name="email" type="email" />
        <ErrorMessage name="email" />

       

        <button type="submit">Sauvegarder les changements</button>
        <button type="button" onClick={toggleEditMode}>Annuler</button>
      </Form>
    </Formik>
  );
};

export default ProfileForm;
