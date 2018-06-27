import './CardPost.scss';
import React from 'react';
import Image from '../../UI/Image/Image';

const CardPost = (props) => {
    return (
        <div className="rw-post-card">
            <div className="rw-post-card__image">
                <Image image={props.image}/>
            </div>
            <div className="rw-post-card__created">
                {props.dateCreated}
            </div>
            <div className="rw-post-card__title">
                {props.title}
            </div>
        </div>
    );
};

export default CardPost;