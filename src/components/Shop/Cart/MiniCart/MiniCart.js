import './MiniCart.scss';
import React from 'react';
import Price from '../../Price/Price';

const MiniCart = (props) => {
    return (
        <div className="rw-mini-cart">
            Cart: {props.count} - <Price value={props.subtotal}/>
        </div>
    );
};

export default MiniCart;