import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../../components/ExploreContainer';
// import './Tab1.css';

const MesPublications: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>MesPublications</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">MesPublications</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page MesPublications" />
      </IonContent>
    </IonPage>
  );
};

export default MesPublications;
