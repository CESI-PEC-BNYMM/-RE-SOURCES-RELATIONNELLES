import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../../components/ExploreContainer';
// import './Tab1.css';

const Role: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Role</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Role</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page Role" />
      </IonContent>
    </IonPage>
  );
};

export default Role;
