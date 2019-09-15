import './MiniCart.scss';
import React from 'react';
import Price from '../../Price/Price';
import {connect} from 'react-redux';
import {getCartTotalPrice, getCartTotalQuantity} from '../../../../redux/utils';

const MiniCart = (props) => {
    return (
        <div className="rw-mini-cart" onClick={props.onLoad}>
            Cart: {props.quantity} - <Price value={props.total}/>
        </div>
    );
};

export default connect(({cart}) => {
    return {
        quantity: getCartTotalQuantity(cart.products),
        total: getCartTotalPrice(cart.products)
    }
}, (dispatch) => {
    return {
        onLoad: () => {
            dispatch({type: 'TEST'})
        }
    }
})(MiniCart);