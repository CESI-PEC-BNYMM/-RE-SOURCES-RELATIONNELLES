import React, { useEffect, useState } from 'react';
import './FAQ.css';

const FAQ = () => {
    useEffect(() => {
        document.title = '(RE) – Foire aux questions';
    }, []);

    const [questions, setQuestions] = useState([
        { question: "Comment puis-je créer un compte ?", answer: "Vous pouvez créer un compte en cliquant sur le bouton \"S'inscrire\" en haut à droite de la page d'accueil. Il faudra ensuite attendre qu'un modérateur valide votre compte." },
        { question: "Comment mettre à jour mes informations personnelles ?", answer: "Connectez-vous à votre compte et accédez à la section \"Paramètres du compte\". Vous pouvez y modifier vos informations personnelles, comme votre nom, adresse email et mot de passe.." },
        { question: "Comment vous contacter ?", answer: "Vous pouvez nous contacter en cliquant sur le bouton \"Contact\" en bas de la page d'accueil. Vous pouvez également nous envoyer un email à l'adresse suivante : nousnavonspasencoredemail@mail.com." },
        { question: "Quelle est votre politique de confidentialité ?", answer: "Nous prenons la confidentialité de vos données très au sérieux. Vous pouvez consulter notre politique de confidentialité en cliquant sur la rubrique RGPD." },
    ]);
    const [openedIndex, setOpenedIndex] = useState(false);
    
    const toggle = (index) => {
        if (openedIndex === index) {
            setOpenedIndex(false);
        } else {
            setOpenedIndex(index);
        }
    }

    const isOpened = (index) => {
        return openedIndex === index;
    }

    return (
        <div className="Content">
            <h4>Foire aux questions</h4>
            {
                questions.map((question, index) => {
                    return (
                        <div key={index} className="whiteBox d-flex flex-column align-items-start pb-0" style={{cursor: 'pointer'}} onClick={() => toggle(index)}>
                            <div className="title d-flex justify-content-between align-items-center user-select-none mb-3">
                                {/* svg arrow to right */}
                                <div className="fs-4 fw-bold">&#62;&nbsp;</div>
                                <h5 className='mb-0'>{question.question}</h5>
                            </div>
                            <div className={`QuestionAnswer ${openedIndex === index ? 'active' : ''}`}>
                                <p>{question.answer}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    );
}

export default FAQ;
