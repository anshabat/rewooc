import './ProductCard.scss';
import React from 'react';
import Image from '../../../UI/Image/Image';
import Price from '../../Price/Price';
import {connect} from 'react-redux';
import {addToCart} from '../../../../redux/actionCreators';
import {isProductInCart} from '../../../../shared/utilities';

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
                {props.isAddingToCart && <span>Adding...</span>}
                {props.isInCart && <a href="#">In Cart</a>}
                <button onClick={e => props.addToCart(e, props.id)} type="button">Add to Cart</button>
            </div>
        </article>
    )
};

export default connect(
    (state, ownProps) => {
        return {
            isAddingToCart: state.cart.addingProductId === ownProps.id,
            isInCart: isProductInCart(ownProps.id, state.cart.products)
        }
    },
    dispatch => {
        return {
            addToCart: (event, id) => {
                dispatch(addToCart(event, id))
            }
        }
    }
)(ProductCard);