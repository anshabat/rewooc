import './MiniCart.css';
import React from 'react';

const MiniCart = (props) => {
    console.log(window.rewooc.cartData);
    return (
        <div className="rw-mini-cart">
            Cart: {props.count} - {props.subtotal}
        </div>
    );
};

export default MiniCart;