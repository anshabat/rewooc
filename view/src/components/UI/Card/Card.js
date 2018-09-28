import './Card.css';
import React from 'react';

const Card = (props) => {
    return (
        <section className="rw-card">
            <h1 className="rw-card__header">
                {props.title}
            </h1>
            <div className="rw-card__body">
                {props.children}
            </div>
        </section>
    );
};

export default Card;