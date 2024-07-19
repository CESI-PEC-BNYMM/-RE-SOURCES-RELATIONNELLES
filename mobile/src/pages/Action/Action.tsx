import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonGrid, IonRow, IonCol } from '@ionic/react';
import ExploreContainer from '../../components/ExploreContainer';
import React from 'react';

const Action: React.FC = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Action</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen className="ion-padding">
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Action</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonGrid className="ion-padding">
                    <IonRow class="ion-justify-content-center">
                        <p>Choisissez l'action que vous souhaitez effectuer :</p>
                    </IonRow>
                </IonGrid>
                <IonGrid>
                    <IonRow class="ion-justify-content-around">
                        {localStorage.getItem('user') ? (
                            <IonCol size="auto">
                                <IonButton routerLink="/fil-d-actualite" onClick={() => localStorage.removeItem('user')}>Se déconnecter</IonButton>
                            </IonCol>
                        ) : null}
                        {!localStorage.getItem('user') ? (
                            <IonCol size="auto">
                                <IonButton routerLink="/login">Se connecter</IonButton>
                            </IonCol>
                        ) : null}
                        {!localStorage.getItem('user') ? (
                            <IonCol size="auto">
                                <IonButton routerLink="/register">S'inscrire</IonButton>
                            </IonCol>
                        ) : null}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Action;
