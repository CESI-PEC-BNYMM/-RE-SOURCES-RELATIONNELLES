import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../../components/ExploreContainer';
// import './Tab1.css';

const GestionAmis: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>GestionAmis</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">GestionAmis</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page GestionAmis" />
      </IonContent>
    </IonPage>
  );
};

export default GestionAmis;
