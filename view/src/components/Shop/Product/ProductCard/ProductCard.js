import './ProductCard.css';
import React from 'react';
import Image from '../../../UI/Image/Image';
import Price from '../../Price/Price';
import product from '../../../../hoc/product';

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
                    <a href="#">
                        In Cart
                    </a>
                ) : (
                    <a href={props.addToCartUrl} onClick={e => props.onAddToCart(props.id, e)}>
                        Add to Cart
                    </a>
                )}
            </div>
        </article>
    )
};

export default product(ProductCard);