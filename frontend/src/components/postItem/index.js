
import React, { Component } from 'react'
import moment from 'moment'


import { API_URL } from '../../constants';
import anonymuser from '../../assets/anonymous.png'

import "./index.scss";

class PostItem extends Component {

    constructor(props){
        super(props);
        this.state = {
            commentLoading:false,
            commentSubmit:false,
            commentBody:null
        }
    }
    render() {
        const {post,key} = this.props ;
        return (
            <article key={key,post}>
                    {/* entete article */}
                    <header>
                        <div>
                            <a>
                                <img
                                    src={ post.author.profile_picture ? `${API_URL}${post.author.profile_picture}` : anonymuser}  />
                            </a>
                        </div>
                        <div className="text">
                            <p className="name">
                                <a>{post.author.username}</a>
                            </p>
                            <p className="date"> Publié le {moment(post.createdAt).format("DD-MM-YYYY")} à {moment(post.createdAt).format("HH:mm")} </p>
                        </div>
                        <div className="more-option">
                            <span aria-label="Supprimer la publication"><i className="fas fa-ellipsis-v"></i></span>
                        </div>
                    </header>
                    <main>
                        <div className="picture">
                            <img src={`${API_URL}${post.picture}`}  />
                        </div>
                        <div className="content">
                            <p> {post.content} </p>
                        </div>
                    </main>
                    <footer >
                        {/* likes actions */}
                        <div className="comments--likes">
                            <div className="likes--left">
                                <button className='alreadyLiked' aria-label="like la publication">
                                    <i class="fas fa-thumbs-up"></i>5
                                </button>
                            </div>
                            <div className="comments--right"><span>{post.likes.length} comment(s)</span></div>
                        </div>
                        <div className="comments" >
                            <h3>Commentaires</h3>
                            <div className="comments--comment">
                                {/* comments list */}
                                <div>
                                    <img src={anonymuser} alt="Photo de profil de "/>
                                </div>
                                <div className="comments--comment--fluid">
                                <p class="title">
                                    <span>bastian</span> le 21/09/2021
                                </p>
                                <p>lorem ipsum indolor in action here</p>
                            </div>
                            <form className="comments--comment--delete">
                                <input type="hidden" name="PostId" />
                                <button type="submit" aria-label="Supprimer le commentaire"><i class="fas fa-trash"></i></button>
                            </form>
                            </div>
                            {/* user add new comments */}
                            <form className="comments--add">
                                <img src={anonymuser} alt="Votre photo de profil" />
                                <label className="hidden">Votre commentaire</label>
                                <input type="text" placeholder="Votre commentaire" />
                                <input type="hidden" name="postId" />
                                <button type="submit" aria-label="Envoyer"><i class="fas fa-plus-circle"></i></button>
                            </form>
                        </div>
                    </footer>
                </article>
        )
    }
}


export default PostItem ;
