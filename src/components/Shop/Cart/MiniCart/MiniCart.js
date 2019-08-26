import './MiniCart.scss';
import React from 'react';
import Price from '../../Price/Price';
import {connect} from 'react-redux';

const MiniCart = (props) => {
    return (
        <div className="rw-mini-cart" onClick={props.onLoad}>
            Cart: {props.count} - <Price value={props.subtotal}/>
        </div>
    );
};

export default connect((state) => {
    return {
        count: state.cart.count,
        subtotal: state.cart.subtotal
    }
}, (dispatch) => {
    return {
        onLoad: () => {dispatch({type: 'TEST'})}
    }
})(MiniCart);