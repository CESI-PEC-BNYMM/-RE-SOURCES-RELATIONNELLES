import React from 'react';
import { NavLink } from 'react-router-dom';
import './MesPublications.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdHeartEmpty, IoMdHeart } from "react-icons/io";
import { BsChat } from "react-icons/bs";
import { FaArrowAltCircleRight, FaEye } from "react-icons/fa";
import { FaCircleExclamation } from "react-icons/fa6";
import { LeafPoll, Result } from 'react-leaf-polls'
import 'react-leaf-polls/dist/index.css'
import PollForm from '../../../components/PollForm/PollForm';

const MesPublications = () => {
    const [myUser, setMyUser] = useState({
        name: 'Mathieu Nowakowski',
        image: 'https://randomuser.me/api/portraits/thumb/men/1.jpg',
    });
    const [users, setUsers] = useState([]);
    const cheerio = require('cheerio');
    const [isPublicationPoll, setIsPublicationPoll] = useState(false);
    const [isPublicationArticle, setIsPublicationArticle] = useState(true);
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
        {
            id: 9,
            key: '/environnement',
            name: 'Environnement',
        }
    ]);
    const [articles, setArticles] = useState([]);
    const [articlesToShow, setArticlesToShow] = useState([]);
    const [showPublishModal, setShowPublishModal] = useState(false);
    const uri = '/espace-personnel/mes-publications';

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
        return 'https://www.google.com/s2/favicons?domain=' + $link + '&sz=64';
    };

    const getTitleFromLink = async ($link) => {
        // return $link.API;
        // return $link.author;
        if ($link.url)
            return $link.author;

        try {
            const response = await axios.get(`${process.env.REACT_APP_PROXY_URL}` + $link).then((response) => {
                const $res = cheerio.load(response.data);
                // get the title of the website (ex: Google or Facebook or L'Équipe)
                return $res('meta[property="og:site_name"]').attr('content') || 'Titre introuvable';
            });
            return response;
        } catch (error) {
            console.error(error);
            return 'Titre introuvable';
        }
    };

    const getDescriptionFromLink = async ($link) => {
        // return $link.Description;
        // return $link.title;
        if ($link.url)
            return $link.title;

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
                type: 'article',
                category: $category,
                isLiked: false,
                showComments: false,
                user: {
                    name: myUser.name,
                    image: myUser.image,
                },
                nbrVue: Math.floor(Math.random() * 1000),
                seen: false,
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
                content: $content,
            });
            $article.showComments = true;
            setArticles([...articles]);
            document.querySelector(('.commentForm' + $articleId + ' input')).value = '';
        }
    };

    const handlePublishButton = ($loading) => {
        if ($loading) {
            document.querySelector('.publishButtonIconDiv').classList.add('spinner-grow');
            document.querySelector('.publishButtonIconDiv').classList.add('spinner-grow-sm');
            document.querySelector('.publishButtonIcon').classList.add('visually-hidden');
            document.querySelector('.publishButtonText').innerHTML = 'Vérification du lien en cours...';
        } else {
            document.querySelector('.publishButtonIconDiv').classList.remove('spinner-grow');
            document.querySelector('.publishButtonIconDiv').classList.remove('spinner-grow-sm');
            document.querySelector('.publishButtonIcon').classList.remove('visually-hidden');
            document.querySelector('.publishButtonText').innerHTML = 'Publier';
        }
    };

    const checkUrl = async ($url) => {
        handlePublishButton(true);

        const apiUrl = `https://www.ipqualityscore.com/api/json/url?key=${process.env.REACT_APP_IPQS_API_KEY}&url=${$url}`;
        const url = `${process.env.REACT_APP_PROXY_URL}` + apiUrl;

        try {
            const res = await axios.get(url);
            console.log(res.data);

            if (!res.data.success) {
                return 'Ce lien est invalide. Si vous pensez qu\'il s\'agit d\'une erreur, veuillez réessayer plus tard ou contactez le support.';
            }

            const {
                risk_score,
                phishing,
                malware,
                adult,
                suspicious,
                spamming,
                parking,
            } = res.data;

            if (risk_score >= 85 || phishing || malware || adult || suspicious || spamming || parking) {
                let reasons = [];

                if (risk_score >= 85) reasons.push('Risque élevé'); // ex : www1.euro.dhl.de
                if (phishing) reasons.push('Phishing détecté'); // ex : paypai-verify-acccount.com
                if (malware) reasons.push('Malware détecté'); // ex : mygreathealthwebsite.com
                if (adult) reasons.push('Contenu adulte'); // ex : www.adultfriendfinder.com
                if (suspicious) reasons.push('URL suspecte'); // ex : badsite.example.com
                if (spamming) reasons.push('SPAM détecté'); // ex : 0n-line.tv
                if (parking) reasons.push('Domaine parqué'); // ex : parked-domain.com

                return `Ce lien est invalide pour les raisons suivantes : ${reasons.join(', ')}`;
            }

            return true;
        } catch (error) {
            console.error(error);
            return 'Erreur lors de la vérification de l\'URL.';
        }
    };

    const publishArticle = async () => {
        const categoryId = parseInt(document.getElementById('publishCategory').value);
        const category = categories.find((cat) => cat.id === categoryId);
        let content = '';
        let link = '';
        let resIPQS = null;
        let poll = null;

        if (isPublicationArticle) {
            content = document.getElementById('publishContent').value || '';
            link = document.getElementById('publishLink').value || '';
            resIPQS = await checkUrl(link);
            if (resIPQS !== true) {
                alert(resIPQS);
                document.getElementById('publishLink').value = '';
                handlePublishButton(false);
                return;
            }
        } else if (isPublicationPoll) {
            const answersCount = parseInt(document.querySelector('input[name="inlineRadioOptions"]:checked').value);
            poll = {
                title: document.getElementById('pollTitle').value,
                answers: Array.from({ length: answersCount }, (_, index) => ({
                    id: index,
                    text: document.getElementById('pollAnswer' + (index + 1)).value,
                    votes: 0,
                })),
            };
        }

        if ((content && link) || (poll && poll.title && poll.answers.length)) {
            const articleBase = {
                id: articles.length + 1,
                category,
                isLiked: false,
                showComments: false,
                user: {
                    name: myUser.name,
                    image: myUser.image,
                },
                nbrVue: 0,
                seen: false,
                date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }),
                comments: [],
            };

            const article = isPublicationArticle ? {
                ...articleBase,
                type: 'article',
                content,
                link: {
                    link,
                    image: getImageFromLink(link),
                    title: await getTitleFromLink(link),
                    description: await getDescriptionFromLink(link),
                },
            } : {
                ...articleBase,
                type: 'poll',
                poll,
            };

            articles.unshift(article);
            setArticles([...articles]);

            if (isPublicationPoll) {
                document.getElementById('pollTitle').value = '';
                document.querySelector('input[name="inlineRadioOptions"]:checked').checked = false;
                Array.from({ length: 4 }, (_, i) => i + 1).forEach(index => {
                    const answerField = document.getElementById('pollAnswer' + index);
                    if (answerField) answerField.value = '';
                });
            } else if (isPublicationArticle) {
                document.getElementById('publishCategory').value = '';
                document.getElementById('publishContent').value = '';
                document.getElementById('publishLink').value = '';
            }

            handlePublishButton(false);
            alert('Article publié !');
            console.log(article);
        }
    };

    const deleteArticle = ($articleId) => {
        if (!window.confirm('Voulez-vous vraiment supprimer cet article ?')) {
            return;
        }
        let $article = articles.find((article) => article.id === $articleId);
        let $index = articles.indexOf($article);
        articles.splice($index, 1);
        setArticles([...articles]);
        alert('Article supprimé !');
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
            <h4 className='mb-4'>Mes publications</h4>
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
                        <div className="Article whiteBox p-3">
                            <button className='btn btn-outline-primary btn-sm w-100' onClick={() => { setShowPublishModal(!showPublishModal); }}>
                                {showPublishModal ? 'Fermer' : 'Publier un article'}
                            </button>
                            {showPublishModal ?
                                <form onSubmit={(e) => { e.preventDefault(); publishArticle(); }} className="w-100 mt-4">
                                    <div className="w-100 mb-4">
                                        <label htmlFor="publicationType">Type de publication</label>
                                        <div className="d-flex gap-4">
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="publicationType" id="publicationArticle" value="article" defaultChecked onClick={() => { setIsPublicationArticle(true); setIsPublicationPoll(false); }} />
                                                <label className="form-check-label" htmlFor="publicationArticle">Article</label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <input className="form-check-input" type="radio" name="publicationType" id="publicationPoll" value="poll" onClick={() => { setIsPublicationArticle(false); setIsPublicationPoll(true); }} />
                                                <label className="form-check-label" htmlFor="publicationPoll">Sondage</label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-100 mb-4">
                                        <select className='form-select' id="publishCategory" required>
                                            <option value="" disabled selected>Sélectionner une catégorie</option>
                                            {categories.filter((category) => category.name !== 'Tous').map((category) => (
                                                <option value={category.id} key={category.id}>{category.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {isPublicationArticle ?
                                        <>
                                            <div className="w-100 mb-4">
                                                <textarea className='form-control' id="publishContent" placeholder="Ajouter un contenu..." required />
                                            </div>
                                            <div className="w-100 mb-4">
                                                <input type="text" className='form-control' id="publishLink" placeholder="Ajouter un lien..." required />
                                            </div>
                                        </>
                                        : null}
                                    {isPublicationPoll && <PollForm />}
                                    <div className='w-100'>
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <button className='btn d-flex align-items-center' type="submit">
                                                <div className='publishButtonIconDiv' role='status'>
                                                    <span className='publishButtonIcon'>
                                                        <FaArrowAltCircleRight />
                                                    </span>
                                                </div>
                                                &nbsp;&nbsp;<span className='publishButtonText'>Publier</span>
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                : null
                            }
                        </div>
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
                                        <div className="d-flex align-items-center gap-2">
                                            <FaEye />{article.nbrVue}
                                        </div>
                                        <button className='btn btn-danger btn-sm' onClick={() => { deleteArticle(article.id); }}>Supprimer</button>
                                        <h6 className='mb-0'>Catégorie: {article.category.name}</h6>
                                    </div>
                                </div>
                                {article.type === 'article' ?
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
                                                            <p className='mb-0'><b>{comment.user.name}</b></p>
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

export default MesPublications;
