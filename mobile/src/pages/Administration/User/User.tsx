import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../../components/ExploreContainer';
// import './Tab1.css';

const User: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>User</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">User</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page User" />
      </IonContent>
    </IonPage>
  );
};

export default User;
