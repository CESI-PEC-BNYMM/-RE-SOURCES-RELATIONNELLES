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
            key: '/sport',
            name: 'Sport',
        },
        {
            id: 3,
            key: '/politique',
            name: 'Politique',
        },
        {
            id: 4,
            key: '/culture',
            name: 'Culture',
        },
        {
            id: 5,
            key: '/economie',
            name: 'Economie',
        },
        {
            id: 6,
            key: '/societe',
            name: 'Société',
        },
        {
            id: 7,
            key: '/technologie',
            name: 'Technologie',
        },
        {
            id: 8,
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

    const getRandomLink = async ($index = 0) => {
        try {
            // const response = await axios.get('https://api.publicapis.org/random');
            const response = await axios.get('https://newsapi.org/v2/top-headlines?country=fr&apiKey=d0e60c7b2f674ee29b6cbb4b1820b595');
            // return response.data.entries[$index];
            return response.data.articles[$index];
        } catch (error) {
            console.error(error);
            return null;
        }
    };

    const getArticleLink = ($link) => {
        // return $link.Link;
        return $link.url;
    };

    const getImageFromLink = ($link) => {
        return 'https://www.google.com/s2/favicons?domain=' + $link;
    };

    const getTitleFromLink = ($link) => {
        // return $link.API;
        return $link.author;
    };

    const getDescriptionFromLink = ($link) => {
        // return $link.Description;
        return $link.title;
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

    const getRandomComments = ($count) => {
        let $comments = [];
        for (let i = 0; i < $count; i++) {
            let $user = users[Math.floor(Math.random() * users.length)];
            $comments.push({
                id: i,
                user: {
                    name: getUserName($user),
                    image: $user.picture.thumbnail,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: getRandomArticleContent(Math.floor(Math.random() * 2) + 1),
            });
        }
        return $comments;
    };

    const setRandomArticles = async () => {
        let $articles = [];
        for (let i = 0; i < users.length; i++) {
            let $category = categories[Math.floor(Math.random() * (categories.length - 1)) + 1]; // Exclude 'Tous'
            // let $randomLink = await getRandomLink(); // for the API PublicAPI
            let $randomLink = await getRandomLink(i); // for the API NewAPI
            let $articleLink = getArticleLink($randomLink);
            $articles.push({
                id: i,
                category: $category,
                showComments: false,
                user: {
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
                    name: $user.name,
                    image: $user.image,
                },
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                content: $content,
            });
            $article.showComments = true;
            setArticles([...articles]);
            document.querySelector(('.commentForm' + $articleId + ' input')).value = '';
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
                            articles.length === 0
                                ? <p>Chargement...</p>
                                : articlesToShow.length === 0
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
                                                    <div className="d-flex align-items-center gap-2 mb-2 profile">
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
