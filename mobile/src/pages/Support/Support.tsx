import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import React from 'react';

const Support: React.FC = () => {
    return (
        <IonPage id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Support</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} className="ion-padding">
                <p>Choisissez la catégorie dans laquelle vous souhaitez vous rendre :</p>
                <IonButton routerLink="/support/faq">FAQ</IonButton>
                <IonButton routerLink="/support/contact">Contact</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default Support;
