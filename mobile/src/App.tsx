import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, home, square, triangle } from 'ionicons/icons';
import FilActualite from './pages/FilActualite/FilActualite';
import "./App.css";
import React, { useState } from 'react';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import User from './pages/Administration/User/User';
import GestionAmis from './pages/EspacePersonnel/GestionAmis/GestionAmis';
import MesPublications from './pages/EspacePersonnel/MesPublications/MesPublications';
import FAQ from './pages/Support/FAQ/FAQ';
import Contact from './pages/Support/Contact/Contact';
import Login from './pages/Action/Login/Login';
import Register from './pages/Action/Register/Register';
import Role from './pages/Administration/Role/Role';
import NotFound from './pages/NotFound/NotFound';
import Support from './pages/Support/Support';
import EspacePersonnel from './pages/EspacePersonnel/EspacePersonnel';
import Action from './pages/Action/Action';
import Administration from './pages/Administration/Administration';

setupIonicReact();

const App: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, last: 'Doe', first: 'John', email: 'john.doe@mail.com', password: 'azerty' },
    { id: 2, last: 'Dough', first: 'Jane', email: 'jane.dough@mail.com', password: 'qwerty' }
  ]);

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/">
              <Redirect to="/fil-d-actualite" />
            </Route>
            <Route exact path="/fil-d-actualite">
              <FilActualite />
            </Route>
            <Route exact path="/fil-d-actualite/*">
              <FilActualite />
            </Route>
            <Route exact path="/support/">
              <Support />
            </Route>
            <Route exact path="/support/contact">
              <Contact />
            </Route>
            <Route exact path="/support/faq">
              <FAQ />
            </Route>
            <Route exact path="/espace-personnel/">
              <EspacePersonnel />
            </Route>
            <Route exact path="/espace-personnel/mes-publications">
              <MesPublications />
            </Route>
            <Route exact path="/espace-personnel/gestion-d-amis">
              <GestionAmis />
            </Route>
            <Route exact path="/espace-personnel/profil">
              <User />
            </Route>
            <Route exact path="/action">
              <Action />
            </Route>
            <Route exact path="/login">
              <Login
                users={users}
              />
            </Route>
            <Route exact path="/register">
              <Register
                users={users}
                setUsers={setUsers}
              />
            </Route>
            <Route exact path="/administration/">
              <Administration />
            </Route>
            <Route exact path="/administration/utilisateurs">
              <User />
            </Route>
            <Route exact path="/administration/roles">
              <Role />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="fil-d-actualite" href="/fil-d-actualite">
              <IonIcon aria-hidden="true" icon={home} />
              <IonLabel>Fil d'actualité</IonLabel>
            </IonTabButton>
            <IonTabButton tab="se-connecter-s-enregistrer" href="/action">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Se connecter<br />S'enregistrer</IonLabel>
            </IonTabButton>
            <IonTabButton tab="support" href="/support/">
              <IonIcon aria-hidden="true" icon={triangle} />
              <IonLabel>Support</IonLabel>
            </IonTabButton>
            <IonTabButton tab="espace-personnel" href="/espace-personnel/">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Espace personnel</IonLabel>
            </IonTabButton>
            <IonTabButton tab="administration" href="/administration/">
              <IonIcon aria-hidden="true" icon={square} />
              <IonLabel>Administration</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
