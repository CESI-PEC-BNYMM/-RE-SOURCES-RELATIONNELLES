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

const Login: React.FC = ($users: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isEmailTouched, setIsEmailTouched] = useState(false);
  const [isPasswordTouched, setIsPasswordTouched] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState<boolean | undefined>();
  const [isPasswordValid, setIsPasswordValid] = useState<boolean | undefined>();

  const handleEmailChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setEmail(value);
  };

  const handlePasswordChange = (event: CustomEvent) => {
    const value = (event.target as HTMLInputElement).value;
    setPassword(value);
  };

  const validateEmail = (email: string) => {
    return email.match(
      /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    );
  };

  const validateFields = () => {
    setIsEmailValid(validateEmail(email));
    setIsPasswordValid(password.trim() !== '');
  };

  const handleLogin = () => {
    validateFields();
    if (isEmailValid && isPasswordValid) {
      const user = $users.users.find((user: any) => user.email === email && user.password === password);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = '/fil-d-actualite';
      } else {
        alert('Email ou mot de passe incorrect.');
      }
    }
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Se connecter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen={true} className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Se connecter</IonTitle>
            <IonTitle size="small" className='ion-padding'>Connectez-vous à votre compte :</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          <IonItem>
            <IonInput
              type="email"
              value={email}
              placeholder="john.doe@mail.com"
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
              placeholder="********"
              onIonChange={handlePasswordChange}
              onIonBlur={() => setIsPasswordTouched(true)}
              className={`${isPasswordTouched && (isPasswordValid ? 'ion-valid' : 'ion-invalid')}`}
            >
              <div slot="end" className="ion-text-end">
                <IonText color="danger">(Requis)</IonText>
              </div>
            </IonInput>
          </IonItem>
        </IonList>
        <IonButton onClick={handleLogin} className='ion-margin-top ion-margin-horizontal' expand="block" fill="outline" size='default' color="primary">Login</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Login;
