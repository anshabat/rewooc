import './CartTable.scss';
import React, {Fragment, useState} from 'react';
import Icon from '../../../UI/Icon/Icon';
import CartProduct from '../CartProduct/CartProduct';
import FormField from '../../../UI/Form/FormField/FormField';
import priceProvider from '../../Price/priceProvider';
import {getCartTotalPrice} from '../../../../redux/utils';
import {connect} from 'react-redux';
import {deleteFromCart, setCartProductQuantity} from '../../../../redux/actionCreators';

function CartTable({products, formatPrice, deleteFromCart, setCartProductQuantity, deletingProduct}) {
    return (
        <>
            <div className="rw-cart-table">
                {products.map(product => {
                    const [quantity, setQuantity] = useState(product.quantity);
                    return (
                        <Fragment key={product.key}>
                            <div className="rw-cart-table__delete">
                                <button className="rw-cart-table__delete-btn" onClick={() => {
                                    deleteFromCart(product.key)
                                }}>
                                    {deletingProduct === product.key ? (
                                        <Icon classes={['fa-circle-o-notch', 'fa-spin']}/>
                                    ) : (
                                        <Icon classes={['fa-times']}/>
                                    )}
                                </button>
                            </div>
                            <div className="rw-cart-table__product">
                                <CartProduct product={product}/>
                            </div>
                            <div className="rw-cart-table__quantity">
                                <FormField
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                    onBlur={() => setCartProductQuantity(product.key, quantity)}
                                    type="number"
                                />
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

const mapStateToProps = ({cart}) => ({
    deletingProduct: cart.deletingProductKey
});

export default connect(mapStateToProps, {deleteFromCart, setCartProductQuantity})(priceProvider(CartTable));