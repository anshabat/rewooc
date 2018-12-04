import './ProductCard.scss';
import React from 'react';
import Image from '../../../UI/Image/Image';
import Price from '../../Price/Price';
import Link from '../../../UI/Link/Link';

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
                    <Link href={props.addToCartUrl} onClick={e => props.onAddToCart(e, props.id)}><span>Add to Cart</span></Link>
                    /*<a href={'http://rewooc.loc' + props.addToCartUrl}><span>Add to Cart</span></a>*/
                )}
            </div>
        </article>
    )
};

export default ProductCard;