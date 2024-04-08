import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import React from 'react';

const Administation: React.FC = () => {
    return (
        <IonPage id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Administation</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} className="ion-padding">
                <p>Choisissez la catégorie dans laquelle vous souhaitez vous rendre :</p>
                <IonButton routerLink="/administration/utilisateurs">Utilisateurs</IonButton>
                <IonButton routerLink="/administration/roles">Rôles</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Administation;
