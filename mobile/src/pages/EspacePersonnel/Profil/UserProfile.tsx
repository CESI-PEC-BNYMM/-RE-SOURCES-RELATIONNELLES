import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../../../components/ExploreContainer';
// import './Tab1.css';

const UserProfile: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>UserProfile</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">UserProfile</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name="Page UserProfile" />
      </IonContent>
    </IonPage>
  );
};

export default UserProfile;
