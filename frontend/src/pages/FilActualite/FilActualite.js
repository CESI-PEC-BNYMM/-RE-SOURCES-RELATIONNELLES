import React from 'react';
import { NavLink } from 'react-router-dom';
import './FilActualite.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";

const FilActualite = () => {
    const [myUser, setMyUser] = useState({
        username: 'mathieu',
        name: 'Mathieu Nowakowski',
        image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    });
    const [users, setUsers] = useState([]);
    const [categories, setCategories] = useState([
        {
            id: 1,
            key: '/',
            name: 'Tous',
        },
        {
            id: 2,
            key: '/favoris',
            name: 'Favoris',
        },
        {
            id: 3,
            key: '/sport',
            name: 'Sport',
        },
        {
            id: 4,
            key: '/politique',
            name: 'Politique',
        },
        {
            id: 5,
            key: '/culture',
            name: 'Culture',
        },
        {
            id: 6,
            key: '/economie',
            name: 'Economie',
        },
        {
            id: 7,
            key: '/societe',
            name: 'Société',
        },
        {
            id: 8,
            key: '/technologie',
            name: 'Technologie',
        },
        {
            id: 9,
            key: '/sante',
            name: 'Santé',
        },
    ]);
    const [articles, setArticles] = useState([]);
    const [articlesToShow, setArticlesToShow] = useState([]);
    const uri = '/fil-d-actualite';

    const getRandomUsers = ($count) => {
        try {
            axios.get('https://randomuser.me/api/?results=' + $count)
                .then((response) => {
                    setUsers(response.data.results);
                });
        } catch (error) {
            console.error(error);
        }
    };

    const formatImage = ($image, $size) => {
        return (
            <img src={$image} alt='user' style={{ width: $size, height: $size, borderRadius: '50%' }} />
        );
    };

    const getUserName = ($user) => {
        return $user.name.first + ' ' + $user.name.last;
    };

    const getRandomLink = async () => {
        try {
            const response = await axios.get('https://api.publicapis.org/random');
            return response.data.entries[0];
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getArticleLink = ($link) => {
        return $link.Link;
    };

    const getImageFromLink = ($link) => {
        return 'https://www.google.com/s2/favicons?domain=' + $link;
    };

    const getTitleFromLink = ($link) => {
        return $link.API;
    };

    const getDescriptionFromLink = ($link) => {
        return $link.Description;
    };

    const getRandomArticleContent = ($count) => {
        let $content = '';
        let $paragraphs = Math.floor(Math.random() * 3) + 1;
        for (let i = 0; i < $paragraphs; i++) {
            let $sentences = $count;
            for (let j = 0; j < $sentences; j++) {
                $content += 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ';
            }
        }
        return $content;
    };

    const getRandomAnswers = ($count) => {
        let $answers = [];
        for (let i = 0; i < $count; i++) {
            let $user = users[Math.floor(Math.random() * users.length)];
            $answers.push({
                user: {
                    username: $user.login.username,
                    name: getUserName($user),
                    image: $user.picture.thumbnail,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: getRandomArticleContent(Math.floor(Math.random() * 1) + 1),
            });
        }
        return $answers;
    };

    const getRandomComments = ($count) => {
        let $comments = [];
        for (let i = 0; i < $count; i++) {
            let $user = users[Math.floor(Math.random() * users.length)];
            $comments.push({
                id: i,
                user: {
                    username: $user.login.username,
                    name: getUserName($user),
                    image: $user.picture.thumbnail,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: getRandomArticleContent(Math.floor(Math.random() * 2) + 1),
                answers: getRandomAnswers(Math.floor(Math.random() * 3) + 1),
                showAnswers: false,
            });
        }
        return $comments;
    };

    const setRandomArticles = async () => {
        let $articles = [];
        for (let i = 0; i < users.length; i++) {
            let $category = categories[Math.floor(Math.random() * categories.length)];
            let $randomLink = await getRandomLink();
            let $articleLink = getArticleLink($randomLink);
            $articles.push({
                id: i,
                category: $category,
                isLiked: false,
                showComments: false,
                user: {
                    username: users[i].login.username,
                    name: getUserName(users[i]),
                    image: users[i].picture.thumbnail,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: getRandomArticleContent(Math.floor(Math.random() * 3) + 1),
                link: {
                    link: $articleLink,
                    image: getImageFromLink($articleLink),
                    title: await getTitleFromLink($randomLink),
                    description: await getDescriptionFromLink($randomLink),
                },
                comments: getRandomComments(Math.floor(Math.random() * 10) + 1),
            });
        }
        setArticles($articles);
    };

    const addComment = ($articleId) => {
        let $article = articles.find((article) => article.id === $articleId);
        let $user = myUser;
        let $content = document.querySelector(('.commentForm' + $articleId + ' input')).value;
        if ($content.length > 0) {
            $article.comments.push({
                user: {
                    username: $user.username,
                    name: $user.name,
                    image: $user.image,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: $content,
                answers: [],
                showAnswers: false,
            });
            $article.showComments = true;
            setArticles([...articles]);
            document.querySelector(('.commentForm' + $articleId + ' input')).value = '';
        }
    };

    const addAnswer = ($articleId, $commentId) => {
        let $article = articles.find((article) => article.id === $articleId);
        let $comment = $article.comments.find((comment) => comment.id === $commentId);
        let $user = myUser;
        let $content = document.querySelector(('.answerForm' + $articleId + $commentId + ' input')).value;
        if ($content.length > 0) {
            $comment.answers.push({
                user: {
                    username: $user.username,
                    name: $user.name,
                    image: $user.image,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: $content,
            });
            $comment.showAnswers = true;
            setArticles([...articles]);
            document.querySelector(('.answerForm' + $articleId + $commentId + ' input')).value = '';
        }
    };

    useEffect(() => {
        getRandomUsers(Math.floor(Math.random() * 10) + 1);
    }, []);

    useEffect(() => {
        setRandomArticles();
    }, [users]);

    useEffect(() => {
        console.log(users);
        console.log(articles);
        setArticlesToShow(articles);
    }, [articles, users]);

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
                                    category.key === '/' ? setArticlesToShow(articles) : category.key === '/favoris' ? setArticlesToShow(articles.filter((article) => article.isLiked)) : setArticlesToShow(articles.filter((article) => article.category.name === category.name));
                                }}>
                                    <li key={category.id}>
                                        {category.name} ({category.key === '/' ? articles.length : category.key === '/favoris' ? articles.filter((article) => article.isLiked).length : articles.filter((article) => article.category.name === category.name).length})
                                    </li>
                                </NavLink>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-md-10">
                    <div className="Articles">
                        {
                            articles.length === 0
                                ? <p>Chargement...</p>
                                : articlesToShow.length === 0
                                    ? <p>Aucun article à afficher</p>
                                    : null
                        }
                        {articlesToShow.map((article) => (
                            <div className="Article p-3" key={article.id}>
                                <div className="d-flex w-100 align-items-start justify-content-between mb-4">
                                    <div className="d-flex align-items-center gap-2 profile" style={{ cursor: 'pointer' }} onClick={() => { window.open('/profil/' + article.user.username, '_blank'); }}>
                                        {formatImage(article.user.image, '50px')}
                                        <div className="d-flex flex-column">
                                            <p className='mb-0'><b>{article.user.name}</b><br />{article.date}</p>
                                        </div>
                                    </div>
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => { article.isLiked = !article.isLiked; setArticles([...articles]); }}>
                                            {article.isLiked ? <p className='text-danger mb-0 user-select-none'><b>Dans vos favoris</b></p> : <p className='mb-0 user-select-none'>Mettre dans vos favoris</p>}
                                            {article.isLiked ? <IoMdHeart fill='red' /> : <IoMdHeartEmpty />}
                                        </div>
                                        <button className='btn btn-danger btn-sm' onClick={() => { alert('Article id: ' + article.id + ' signalé !') }}>Signaler</button>
                                        <h6 className='mb-0'>Catégorie: {article.category.name}</h6>
                                    </div>
                                </div>
                                <div className="w-100 mb-4">
                                    <p>{article.content}</p>
                                    <div className="ArticleLink" onClick={() => { window.open(article.link.link, '_blank'); }}>
                                        <img src={article.link.image} alt={article.link.title} />
                                        <div>
                                            <h4>{article.link.title}</h4>
                                            <p>{article.link.description}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='w-100'>
                                    <div className="d-flex align-items-center justify-content-between mb-4">
                                        <button className='btn d-flex align-items-center' onClick={() => { article.showComments = true; setArticles([...articles]); setTimeout(() => { document.querySelector(('.commentForm' + article.id + ' input')).focus(); }, 100); }}>
                                            <BsChat />&nbsp;&nbsp;Commenter
                                        </button>
                                        <button className='btn' style={{ color: 'grey' }} onClick={() => { article.showComments = !article.showComments; setArticles([...articles]); }}>
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
                                                    <div className="d-flex align-items-center gap-2 mb-2 profile" style={{ cursor: 'pointer' }} onClick={() => { window.open('/profil/' + comment.user.username, '_blank'); }}>
                                                        {formatImage(comment.user.image, '35px')}
                                                        <div className="d-flex flex-column">
                                                            <p className='mb-0'><b>{comment.user.name}</b><br />{comment.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="commentContent">
                                                        <p>{comment.content}</p>
                                                        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => { alert('Commentaire de ' + comment.user.name + ' signalé !') }}>
                                                            <FaCircleExclamation fill='red' />
                                                        </div>
                                                    </div>
                                                    <div className="d-flex align-items-center justify-content-center mb-3" style={{ width: 'fit-content' }}>
                                                        {comment.answers.length > 0 ?
                                                            <button className='btn btn-sm' onClick={() => { comment.showAnswers = !comment.showAnswers; setArticles([...articles]); }}>
                                                                <small>{comment.showAnswers ? ('Masquer' + (comment.answers.length > 1 ? ' les réponses' : ' la réponse')) : ('Voir' + (comment.answers.length > 1 ? ' les ' + comment.answers.length + ' réponses' : ' la réponse'))}</small>
                                                            </button>
                                                            : null}
                                                        <button className='btn btn-sm d-flex' onClick={() => { comment.showAnswers = true; setArticles([...articles]); setTimeout(() => { document.querySelector(('.answerForm' + article.id + comment.id + ' input')).focus(); }, 100); }}>
                                                            <small>Répondre</small>
                                                        </button>
                                                    </div>
                                                    {comment.showAnswers ?
                                                        <div className="Answers">
                                                            <form className={"answerForm" + article.id + comment.id + " input-group input-group-sm mb-4"} onSubmit={(e) => { e.preventDefault(); addAnswer(article.id, comment.id); }}>
                                                                <input type="text" className='form-control' placeholder="Ajouter une réponse..." aria-label="Ajouter une réponse..." aria-describedby="button-addon3" />
                                                                <div className="input-group-text p-0">
                                                                    <button className='btn' type="submit"><FaArrowAltCircleRight /></button>
                                                                </div>
                                                            </form>
                                                            {comment.answers.length > 0 && comment.answers.map((answer, index) => (
                                                                <div className="Answer ms-5 mb-2" key={index}>
                                                                    <div className="d-flex align-items-center gap-2 mb-2 profile" style={{ cursor: 'pointer' }} onClick={() => { window.open('/profil/' + answer.user.username, '_blank'); }}>
                                                                        {formatImage(answer.user.image, '35px')}
                                                                        <div className="d-flex flex-column">
                                                                            <p className='mb-0'><b>{answer.user.name}</b><br />{answer.date}</p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="commentContent">
                                                                        <p>{answer.content}</p>
                                                                        <div className="d-flex align-items-center gap-2" style={{ cursor: 'pointer' }} onClick={() => { alert('Réponse de ' + answer.user.name + ' signalée !') }}>
                                                                            <FaCircleExclamation fill='red' />
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        : null}
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
        </div>
    );
}

export default FilActualite;
