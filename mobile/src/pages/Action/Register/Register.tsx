import React, { useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonList,
  IonItem,
  IonText,
  IonButton
} from '@ionic/react';

interface User {
  id: number;
  last: string;
  first: string;
  email: string;
  password: string;
}

const Register: React.FC = ({ users, setUsers }: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isConfirmPasswordTouched, setIsConfirmPasswordTouched] = useState(false);
  const [isFirstNameTouched, setIsFirstNameTouched] = useState(false);
  const [isLastNameTouched, setIsLastNameTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | undefined>();
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState<boolean | undefined>();
  const [isFirstNameValid, setIsFirstNameValid] = useState<boolean | undefined>();
  const [isLastNameValid, setIsLastNameValid] = useState<boolean | undefined>();

  const handleEmailChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setEmail(value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setPassword(value);
  };

  const handleConfirmPasswordChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setConfirmPassword(value);
  };

  const handleFirstNameChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setFirstName(value);
  };

  const handleLastNameChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setLastName(value);
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validateFields = () => {
    setIsEmailValid(validateEmail(email));
    setIsPasswordValid(password.trim() !== '');
    setIsConfirmPasswordValid(confirmPassword === password);
    setIsFirstNameValid(firstName.trim() !== '');
    setIsLastNameValid(lastName.trim() !== '');
  };

  const handleRegister = () => {
    validateFields();
    if (isEmailValid && isPasswordValid && isConfirmPasswordValid && isFirstNameValid && isLastNameValid) {
      const newUser: User = {
        id: users.length + 1,
        last: lastName,
        first: firstName,
        email: email,
        password: password
      };
      setUsers([...users, newUser]);
      alert('Inscription réussie!');
      window.location.href = '/login';
    }
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>S'inscrire</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">S'inscrire</IonTitle>
            <IonTitle size="small" className='ion-padding'>Créez votre compte :</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput
              type="text"
              value={firstName}
              placeholder="Prénom"
              onIonChange={handleFirstNameChange}
              onIonBlur={() => setIsFirstNameTouched(true)}
              className={`${isFirstNameTouched && (isFirstNameValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="text"
              value={lastName}
              placeholder="Nom"
              onIonChange={handleLastNameChange}
              onIonBlur={() => setIsLastNameTouched(true)}
              className={`${isLastNameTouched && (isLastNameValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="email"
              value={email}
              placeholder="E-mail"
              onIonChange={handleEmailChange}
              onIonBlur={() => setIsEmailTouched(true)}
              className={`${isEmailTouched && (isEmailValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="password"
              value={password}
              placeholder="Mot de passe"
              onIonChange={handlePasswordChange}
              onIonBlur={() => setIsPasswordTouched(true)}
              className={`${isPasswordTouched && (isPasswordValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
          <IonItem>
            <IonInput
              type="password"
              value={confirmPassword}
              placeholder="Confirmer le mot de passe"
              onIonChange={handleConfirmPasswordChange}
              onIonBlur={() => setIsConfirmPasswordTouched(true)}
              className={`${isConfirmPasswordTouched && (isConfirmPasswordValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={handleRegister} className='ion-margin-top ion-margin-horizontal' expand="block" fill="outline" size='default' color="primary">S'inscrire</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
