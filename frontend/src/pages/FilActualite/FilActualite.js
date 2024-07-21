import React from 'react';
import { NavLink } from 'react-router-dom';
import './FilActualite.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { FaArrowAltCircleRight, FaEye } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import ErrorModal from '../../components/ErrorModal/ErrorModal';

const FilActualite = () => {
    useEffect(() => {
        document.title = '(RE) – Fil d\'actualité';
    }, []);

    const [myUser, setMyUser] = useState({
        name: localStorage.getItem('prenom') + ' ' + localStorage.getItem('nom'),
        image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    });
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [articlesToShow, setArticlesToShow] = useState([]);
    const uri = '/fil-d-actualite';
    const cheerio = require('cheerio');

    const api_url = process.env.REACT_APP_API_URI + '/api';
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCategories = async () => {
        try {
            const queryParams = new URLSearchParams({
                // No parameters needed
            }).toString();
            const response = await axios.get(`${api_url}/categories/list?${queryParams}`);
            console.log(response.data);
            const newArray = response.data.map((category) => {
                console.log(category);
                return {
                    id: category.idCategorie,
                    key: '/' + category.libelle.toLowerCase(),
                    name: category.libelle,
                    actif: category.actif,
                };
            }).filter((category) => category.actif === true);
            newArray.unshift({
                id: 0,
                key: '/',
                name: 'Tous',
                actif: true,
            });
            setCategories(newArray);
        } catch (error) {
            setErrorMessage('Informations : ' + error.response.data.error + ' (Code erreur : ' + error.response.data.status + ')');
            setShowErrorModal(true);
        }
    };

    const fetchArticles = async () => {
        try {
            const queryParams = new URLSearchParams({
                // No parameters needed
            }).toString();
            const response = await axios.get(`${api_url}/publications/list?${queryParams}`);
            console.log(response.data);

            const newArray = [];
            for (const article of response.data) {
                console.log(article);
                const processedArticle = await processArticle(article);
                newArray.push(processedArticle);
            }

            setArticles(newArray);
        } catch (error) {
            setErrorMessage('Informations : ' + error.response.data.error + ' (Code erreur : ' + error.response.data.status + ')');
            setShowErrorModal(true);
        }
    };

    const processArticle = async (article) => {
        return {
            id: article.idPublication,
            type: 'article',
            category: {
                id: article.categories[0].idCategorie,
                name: article.categories[0].libelle,
            },
            showComments: false,
            user: {
                name: article.citoyen.prenom + ' ' + article.citoyen.nom,
                image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
            },
            date: new Date(article.datePub).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
            nbrVue: (article.nbrVues === 0 || article.nbrVues === null) ? 0 : article.nbrVues,
            seen: false,
            content: article.description,
            link: {
                link: article.ressources[0].lien,
                image: getImageFromLink(article.ressources[0].lien),
                title: await getTitleFromLink(article.ressources[0].lien),
                description: await getDescriptionFromLink(article.ressources[0].lien),
            },
            comments: processComments(article.commentaires),
        };
    };

    const processComments = (comments) => {
        return comments.map((comment) => {
            return {
                id: comment.idCommentaire,
                user: {
                    name: comment.citoyen.prenom + ' ' + comment.citoyen.nom,
                    image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
                },
                content: comment.tewtCommentaire,
            };
        });
    };

    const formatImage = ($image, $size) => {
        return (
            <img src={$image} alt='user' style={{ width: $size, height: $size, borderRadius: '50%' }} />
        );
    };

    const getImageFromLink = ($link) => {
        return 'https://www.google.com/s2/favicons?domain=' + $link + '&sz=64';
    };

    const getTitleFromLink = async ($link) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PROXY_URL}` + $link).then((response) => {
                const $res = cheerio.load(response.data);
                return $res('meta[property="og:site_name"]').attr('content') || 'Titre introuvable';
            });
            return response;
        } catch (error) {
            console.error(error);
            return 'Titre introuvable';
        }
    };

    const getDescriptionFromLink = async ($link) => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_PROXY_URL}` + $link).then((response) => {
                const $res = cheerio.load(response.data);
                return $res('title').text() || 'Description introuvable';
            });
            return response;
        } catch (error) {
            console.error(error);
            return 'Description introuvable';
        }
    };

    const addComment = ($articleId) => {
        let $article = articles.find((article) => article.id === $articleId);
        let $user = myUser;
        let $content = document.querySelector(('.commentForm' + $articleId + ' input')).value;
        if ($content.length > 0) {
            $article.comments.push({
                user: {
                    name: $user.name,
                    image: $user.image,
                },
                content: $content,
            });
            $article.showComments = true;
            setArticles([...articles]);
            document.querySelector(('.commentForm' + $articleId + ' input')).value = '';
        }
    };

    const reportComment = async ($commentId) => {
        if (window.confirm('Voulez-vous vraiment signaler ce commentaire ?')) {
            try {
                // // /commentaires/signale/1
                const response = await axios.put(`${api_url}/commentaires/signale/${$commentId}?commentaireSignale=true`);
                console.log(response.data);
                alert('Commentaire signalé !');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la signalisation du commentaire.');
            }
        }
    };

    const increaseView = async ($articleId) => {
        let $article = articles.find((article) => article.id === $articleId);
        if ($article.seen) {
            return;
        }
        $article.nbrVue++;
        $article.seen = true;
        setArticles([...articles]);
        try {
            const response = await axios.post(`${api_url}/publications/increase_views/${$articleId}`);
            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const reportPublication = async ($articleId) => {
        if (window.confirm('Voulez-vous vraiment signaler cette publication ?')) {
            try {
                const response = await axios.post(`${api_url}/publications/report/${$articleId}`);
                console.log(response.data);
                alert('Publication signalée !');
            } catch (error) {
                console.error(error);
                alert('Erreur lors de la signalisation de la publication.');
            }
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchArticles();
    }, []);

    useEffect(() => {
        console.log(articles);
        setArticlesToShow(articles);
    }, [articles]);

    return (
        <div className="Content">
            <h4 className='mb-4'>Fil d'actualité</h4>
            <div className="row">
                <div className="col-md-2" style={{ borderRight: '1px solid #ccc' }}>
                    <div className="Categories d-flex flex-column align-items-center">
                        <h5>Catégories</h5>
                        <ul>
                            {categories.map((category) => (
                                <NavLink to={uri + category.key} key={category.id} onClick={() => {
                                    category.key === '/' ? setArticlesToShow(articles) : setArticlesToShow(articles.filter((article) => article.category.name === category.name));
                                }}>
                                    <li key={category.id}>
                                        {category.name} ({category.key === '/' ? articles.length : articles.filter((article) => article.category.name === category.name).length})
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="Articles">
                        {
                            articlesToShow.length === 0
                                ? <p>Aucun article à afficher</p>
                                : null
                        }
                        {articlesToShow.map((article) => (
                            <div className="Article whiteBox p-3" key={article.id}>
                                <div className="d-flex w-100 align-items-start justify-content-between mb-4">
                                    <div className="d-flex align-items-center gap-2 profile">
                                        {formatImage(article.user.image, '50px')}
                                        <div className="d-flex flex-column">
                                            <p className='mb-0'><b>{article.user.name}</b><br />{article.date}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="d-flex align-items-center gap-2">
                                            <FaEye />{article.nbrVue}
                                        </div>
                                        <button className='btn btn-danger btn-sm' onClick={() => { reportPublication(article.id) }}>Signaler</button>
                                        <h6 className='mb-0'>Catégorie: {article.category.name}</h6>
                                    </div>
                                </div>
                                {article.type === 'article' ?
                                    <div className="w-100 mb-4">
                                        <p>{article.content}</p>
                                        <div className="ArticleLink" onClick={() => { window.open(article.link.link, '_blank'); increaseView(article.id); }}>
                                            <img src={article.link.image} alt={article.link.title} />
                                            <div>
                                                <h4>{article.link.title}</h4>
                                                <p>{article.link.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    : null}
                                {article.type === 'poll' ?
                                    <div className="w-100 mb-4">
                                        <LeafPoll
                                            type='multiple'
                                            question={"Sondage : " + article.poll.title}
                                            results={article.poll.answers}
                                            theme={{
                                                mainColor: '#5f849a',
                                                textColor: 'black',
                                                backgroundColor: 'white',
                                                alignment: 'start',
                                            }}
                                            onVote={(answer) => {
                                                article.poll.answers = article.poll.answers.map((choice) => {
                                                    if (choice.id === answer.id) {
                                                        choice.votes++;
                                                    }
                                                    return choice;
                                                });
                                                setArticles([...articles]);
                                            }}
                                            isVoted={false}
                                        />
                                    </div>
                                    : null}
                                <div className='w-100'>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <button className='btn d-flex align-items-center' onClick={() => { article.showComments = true; setArticles([...articles]); setTimeout(() => { document.querySelector(('.commentForm' + article.id + ' input')).focus(); }, 100); increaseView(article.id); }}>
                                            <BsChat />&nbsp;&nbsp;Commenter
                                        </button>
                                        <button className='btn' style={{ color: 'grey' }} onClick={() => { article.showComments = !article.showComments; setArticles([...articles]); increaseView(article.id); }}>
                                            <small>{article.showComments ? ('Masquer' + (article.comments.length > 1 ? ' les commentaires' : ' le commentaire')) : ('Voir' + (article.comments.length > 1 ? ' les ' + article.comments.length + ' commentaires' : ' le commentaire'))}</small>
                                        </button>
                                    </div>
                                    {article.showComments ?
                                        <div className="comments">
                                            <form className={"commentForm" + article.id + " input-group mb-4"} onSubmit={(e) => { e.preventDefault(); addComment(article.id); }}>
                                                <input type="text" className='form-control' placeholder="Ajouter un commentaire..." aria-label="Ajouter un commentaire..." aria-describedby="button-addon2" />
                                                <div className="input-group-text p-0">
                                                    <button className='btn' type="submit"><FaArrowAltCircleRight /></button>
                                                </div>
                                            </form>
                                            {article.comments.length > 0 && article.comments.map((comment, index) => (
                                                <div className="Comment commentUser" key={index}>
                                                    <div className="d-flex align-items-center gap-2 mb-2 profile">
                                                        {formatImage(comment.user.image, '35px')}
                                                        <div className="d-flex flex-column">
                                                            <p className='mb-0'><b>{comment.user.name}</b></p>
                                                        </div>
                                                    </div>
                                                    <div className="commentContent">
                                                        <p>{comment.content}</p>
                                                        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => { reportComment(comment.id); }}>
                                                            <FaCircleExclamation fill='red' />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        : null}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <ErrorModal
                show={showErrorModal}
                onHide={() => setShowErrorModal(false)}
                title="Erreur"
                message={errorMessage}
            />
        </div>
    );
}

export default FilActualite;
