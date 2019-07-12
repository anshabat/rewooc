import './ProductCard.scss';
import React from 'react';
import Image from '../../../UI/Image/Image';
import Price from '../../Price/Price';
import {apiUrl} from '../../../../shared/utilities';

const ProductCard = (props) => {
    return (
        <article className="rw-product-card">
            <div className="rw-product-card__row">
                <Image image={props.image}/>
            </div>
            <h3 className="rw-product-card__row">
                <a className="ps-link ps-link--primary" href={props.link}>
                    {props.title}
                </a>
            </h3>
            <div className="rw-product-card__row">
                <Price value={props.price}/>
            </div>
            <div className="rw-product-card__row">
                {props.inCart ? (
                    <a href="#">In Cart</a>
                ) : props.isAdding ? (
                    <span>Adding...</span>
                ) : (
                    <button onClick={e => props.onAddToCart(e, props.id)}>Add to Cart</button>
                )}
            </div>
        </article>
    )
};

export default ProductCard;