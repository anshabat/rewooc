import React from 'react';
import {connect} from 'react-redux';
import Content from '../../Layout/Content/Content';
import pageProvider from '../pageProvider';
import CartTable from '../../shop/cart/CartTable/CartTable';

function Cart({title, cart}) {
    return (
        <Content title={title}>
            {cart.count > 0 ? (
                <CartTable products={Object.values(cart.items)} totals={cart.totals}/>
            ) : (
                <p>Cart is empty</p>
            )}
        </Content>
    );
}

export default connect(state => ({
    cart: state.cart
}))(pageProvider(Cart));