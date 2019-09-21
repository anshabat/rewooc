import './CartTable.scss';
import React, {Fragment} from 'react';
import Icon from '../../../UI/Icon/Icon';
import CartProduct from '../CartProduct/CartProduct';
import FormField from '../../../UI/Form/FormField/FormField';
import priceProvider from '../../Price/priceProvider';
import {getCartTotalPrice} from '../../../../redux/utils';
import {connect} from 'react-redux';
import {deleteFromCart} from '../../../../redux/actionCreators';

function CartTable({products, formatPrice, onProductDelete}) {
    const foo = () => {
        console.log('lala');
    };
    return (
        <>
            <div className="rw-cart-table">
                {products.map(product => {
                    return (
                        <Fragment key={product.id}>
                            <button className="rw-cart-table__delete" onClick={() => {
                                onProductDelete(product.id)
                            }}>
                                <Icon classes={['fa-times']}/>
                            </button>
                            <div className="rw-cart-table__product">
                                <CartProduct product={product}/>
                            </div>
                            <div className="rw-cart-table__quantity">
                                <FormField value={product.quantity} onChange={foo} type="number"/>
                            </div>
                            <div className="rw-cart-table__price">
                                {formatPrice(product.price * product.quantity)}
                            </div>
                        </Fragment>
                    )
                })}
            </div>
            <div style={{textAlign: 'right', fontWeight: 'bold', marginTop: '20px'}}>
                Total: {formatPrice(getCartTotalPrice(products))}
            </div>
        </>
    );
}

export default connect(null, (dispatch => {
    return {
        onProductDelete: (productId) => {
            dispatch(deleteFromCart(productId));
        }
    }
}))(priceProvider(CartTable));