import React, { useState, useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardContent, IonList, IonItem, IonLabel, IonIcon } from '@ionic/react';
import axios from 'axios';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { FaCircleExclamation } from "react-icons/fa6";
import Logo from '../../assets/Logo (RE)ssources relationnelles v4.png';

const FilActualite: React.FC = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [articlesToShow, setArticlesToShow] = useState<any[]>([]);
  const uri = '/fil-d-actualite';

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=d0e60c7b2f674ee29b6cbb4b1820b595');
        setArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    setArticlesToShow(articles);
  }, [articles]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Fil d'actualité</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          <IonToolbar>
            <img src={Logo} alt="Logo" height="50" />
            <IonTitle size="large">Bonjour {localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).first : ''} !</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonList>
          {articlesToShow.map((article, index) => (
            <IonCard key={index}>
              <IonCardHeader>
                <IonItem lines="none">
                  <IonLabel>
                    <h2>{article.title}</h2>
                    <p>{article.publishedAt}</p>
                  </IonLabel>
                  <IonIcon icon={article.isLiked ? IoMdHeart : IoMdHeartEmpty} color={article.isLiked ? 'danger' : 'primary'} onClick={() => handleLike(index)} />
                </IonItem>
              </IonCardHeader>
              <IonCardContent>
                <p>{article.description}</p>
                <IonItem lines="none">
                  <IonLabel>
                    <IonIcon icon={BsChat} />
                    <span>Commenter</span>
                  </IonLabel>
                  <IonIcon icon={FaCircleExclamation} color="danger" onClick={() => handleReport(index)} />
                </IonItem>
              </IonCardContent>
            </IonCard>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );

  function handleLike(index: number) {
    const updatedArticles = [...articles];
    updatedArticles[index].isLiked = !updatedArticles[index].isLiked;
    setArticles(updatedArticles);
  }

  function handleReport(index: number) {
    alert('Article id: ' + index + ' signalé !');
  }
};

export default FilActualite;
