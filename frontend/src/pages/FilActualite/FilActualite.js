import React from 'react';
import { NavLink } from 'react-router-dom';
import './FilActualite.css';

const FilActualite = () => {
    const uri = '/fil-d-actualite';

    return (
        <div className='Content'>
            <h4>Fil d'actualité</h4>
            <div id='Container'>
                <div id='Catégories'>
                    <h5>Catégories</h5>
                    <div id='CatégorieNavlinks'>
                        <NavLink to={uri + '/'}>Tous</NavLink>
                        <NavLink to={uri + '/sport'}>Sport</NavLink>
                        <NavLink to={uri + '/culture'}>Culture</NavLink>
                        <NavLink to={uri + '/politique'}>Politique</NavLink>
                        <NavLink to={uri + '/societe'}>Société</NavLink>
                        <NavLink to={uri + '/cuisine'}>Cuisine</NavLink>
                    </div>
                </div>
                <div id='Articles'>
                    <div className='PosterArticle'>
                        <input type='text' placeholder='Quoi de neuf ?' />
                    </div>
                    <div className='Article'>
                        <div className='HeaderArticle'>
                            <div className='Profile'>
                                <img src='https://picsum.photos/200' alt='Profile' />
                                <div className='ProfileInfos'>
                                    <h6>John Doe</h6>
                                    <p>20/05/2021</p>
                                </div>
                            </div>
                            <div className='RightHeaderArticle'>
                                <div className='d-flex gap-3 align-items-center'>
                                    <btn className='btn btn-primary'>Favoris</btn>
                                    {/* svg coeur */}
                                    <button className='btn btn-primary btn-danger'>Signaler</button>
                                    <h5>Catégorie : Sport</h5>
                                </div>
                            </div>
                        </div>
                        <div className='ContentArticle'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.</p>
                            <div className='FichierArticle'>
                                <a href='#'>
                                    <img src='https://picsum.photos/400' alt='Fichier de la publication' />
                                    <div className='FichierInfos'>
                                        <h6 className='title'>Titre du fichier</h6>
                                        <p className='description'>Description du fichier</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='FooterArticle'>
                            <div className='GestionCommentaires'>
                                <div className='ActionCommenter'>
                                    {/* svg commentaire */}
                                    <button className='btn btn-primary'>Commenter</button>
                                </div>
                                <button className='btn btn-primary'>Masquer les commentaires</button>
                            </div>
                            <div className='Commentaires'>
                                <div className='Commentaire'>
                                    <div className='CommentaireInfos'>
                                        <div className='Profile'>
                                            <img src='https://picsum.photos/200' alt='Profile' />
                                        </div>
                                        <div className='CommentaireBox'>
                                            <div>
                                                <h6>Jane Doe</h6>
                                                <button className='btn btn-primary btn-danger'>Signaler</button>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            {/* svg signaler */}
                                        </div>
                                    </div>
                                    <div className='ActionCommentaire'>
                                        <button className='btn btn-primary'>Répondre</button>
                                        <button className='btn btn-primary'>Masquer les réponses</button>
                                    </div>
                                    <div className='Reponses'>
                                        <div className='Reponse'>
                                            <div className='CommentaireInfos'>
                                                <div className='Profile'>
                                                    <img src='https://picsum.photos/200' alt='Profile' />
                                                </div>
                                                <div className='CommentaireBox'>
                                                    <div>
                                                        <h6>John Doe</h6>
                                                        <button className='btn btn-primary btn-danger'>Signaler</button>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    {/* svg signaler */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='Reponse'>
                                            <div className='CommentaireInfos'>
                                                <div className='Profile'>
                                                    <img src='https://picsum.photos/200' alt='Profile' />
                                                </div>
                                                <div className='CommentaireBox'>
                                                    <div>
                                                        <h6>John Doe</h6>
                                                        <button className='btn btn-primary btn-danger'>Signaler</button>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    {/* svg signaler */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='Commentaire'>
                                    <div className='CommentaireInfos'>
                                        <div className='Profile'>
                                            <img src='https://picsum.photos/200' alt='Profile' />
                                        </div>
                                        <div className='CommentaireBox'>
                                            <div>
                                                <h6>Jane Doe</h6>
                                                <button className='btn btn-primary btn-danger'>Signaler</button>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            {/* svg signaler commentaire */}
                                        </div>
                                    </div>
                                    <div className='ActionCommentaire'>
                                        <button className='btn btn-primary'>Répondre</button>
                                    </div>
                                </div>
                            </div>
                            <div className='AjouterCommentaire'>
                                <div className='Profile'>
                                    <img src='https://picsum.photos/200' alt='Profile' />
                                </div>
                                <div className='CommentaireBox'>
                                    <input type='text' placeholder='Ajouter un commentaire...' />
                                    {/* svg envoyer */}
                                    <button className='btn btn-primary'>Publier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='Article'>
                        <div className='HeaderArticle'>
                            <div className='Profile'>
                                <img src='https://picsum.photos/200' alt='Profile' />
                                <div className='ProfileInfos'>
                                    <h6>John Doe</h6>
                                    <p>20/05/2021</p>
                                </div>
                            </div>
                            <div className='RightHeaderArticle'>
                                <div className='d-flex gap-3 align-items-center'>
                                    <btn className='btn btn-primary'>Favoris</btn>
                                    {/* svg coeur */}
                                    <button className='btn btn-primary btn-danger'>Signaler</button>
                                    <h5>Catégorie : Sport</h5>
                                </div>
                            </div>
                        </div>
                        <div className='ContentArticle'>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec purus nec nunc.</p>
                            <div className='FichierArticle'>
                                <a href='#'>
                                    <img src='https://picsum.photos/400' alt='Fichier de la publication' />
                                    <div className='FichierInfos'>
                                        <h6 className='title'>Titre du fichier</h6>
                                        <p className='description'>Description du fichier</p>
                                    </div>
                                </a>
                            </div>
                        </div>
                        <div className='FooterArticle'>
                            <div className='GestionCommentaires'>
                                <div className='ActionCommenter'>
                                    {/* svg commentaire */}
                                    <button className='btn btn-primary'>Commenter</button>
                                </div>
                                <button className='btn btn-primary'>Masquer les commentaires</button>
                            </div>
                            <div className='Commentaires'>
                                <div className='Commentaire'>
                                    <div className='CommentaireInfos'>
                                        <div className='Profile'>
                                            <img src='https://picsum.photos/200' alt='Profile' />
                                        </div>
                                        <div className='CommentaireBox'>
                                            <div>
                                                <h6>Jane Doe</h6>
                                                <button className='btn btn-primary btn-danger'>Signaler</button>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            {/* svg signaler */}
                                        </div>
                                    </div>
                                    <div className='ActionCommentaire'>
                                        <button className='btn btn-primary'>Répondre</button>
                                        <button className='btn btn-primary'>Masquer les réponses</button>
                                    </div>
                                    <div className='Reponses'>
                                        <div className='Reponse'>
                                            <div className='CommentaireInfos'>
                                                <div className='Profile'>
                                                    <img src='https://picsum.photos/200' alt='Profile' />
                                                </div>
                                                <div className='CommentaireBox'>
                                                    <div>
                                                        <h6>John Doe</h6>
                                                        <button className='btn btn-primary btn-danger'>Signaler</button>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    {/* svg signaler */}
                                                </div>
                                            </div>
                                        </div>
                                        <div className='Reponse'>
                                            <div className='CommentaireInfos'>
                                                <div className='Profile'>
                                                    <img src='https://picsum.photos/200' alt='Profile' />
                                                </div>
                                                <div className='CommentaireBox'>
                                                    <div>
                                                        <h6>John Doe</h6>
                                                        <button className='btn btn-primary btn-danger'>Signaler</button>
                                                    </div>
                                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                                    {/* svg signaler */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className='Commentaire'>
                                    <div className='CommentaireInfos'>
                                        <div className='Profile'>
                                            <img src='https://picsum.photos/200' alt='Profile' />
                                        </div>
                                        <div className='CommentaireBox'>
                                            <div>
                                                <h6>Jane Doe</h6>
                                                <button className='btn btn-primary btn-danger'>Signaler</button>
                                            </div>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                            {/* svg signaler commentaire */}
                                        </div>
                                    </div>
                                    <div className='ActionCommentaire'>
                                        <button className='btn btn-primary'>Répondre</button>
                                    </div>
                                </div>
                            </div>
                            <div className='AjouterCommentaire'>
                                <div className='Profile'>
                                    <img src='https://picsum.photos/200' alt='Profile' />
                                </div>
                                <div className='CommentaireBox'>
                                    <input type='text' placeholder='Ajouter un commentaire...' />
                                    {/* svg envoyer */}
                                    <button className='btn btn-primary'>Publier</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FilActualite;
