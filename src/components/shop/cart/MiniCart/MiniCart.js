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

const mapStateToProps = ({cart}) => ({
    quantity: getCartTotalQuantity(cart.products),
    total: getCartTotalPrice(cart.products)
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => {
        dispatch({type: 'TEST'})
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(MiniCart);