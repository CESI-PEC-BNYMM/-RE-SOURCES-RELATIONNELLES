import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import React from 'react';

const EspacePersonnel: React.FC = () => {
    return (
        <IonPage id="main-content">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>EspacePersonnel</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} className="ion-padding">
                <p>Choisissez la catégorie dans laquelle vous souhaitez vous rendre :</p>
                <IonButton routerLink="/espace-personnel/gestion-d-amis">Gestion d'amis</IonButton>
                <IonButton routerLink="/espace-personnel/mes-publications">Mes publications</IonButton>
                <IonButton routerLink="/espace-personnel/profil">Profil</IonButton>
            </IonContent>
        </IonPage>
    );
};

export default EspacePersonnel;
