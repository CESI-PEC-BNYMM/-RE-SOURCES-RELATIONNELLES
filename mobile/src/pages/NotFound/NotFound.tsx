import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
// import './Tab1.css';

const NotFound: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NotFound</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">NotFound</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page NotFound" />
      </IonContent>
    </IonPage>
  );
};

export default NotFound;
