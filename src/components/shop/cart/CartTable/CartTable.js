import './CartTable.scss';
import React from 'react';
import SectionPrimary from '../../../UI/sections/SectionPrimary/SectionPrimary';
import Icon from '../../../UI/Icon/Icon';
import CartProduct from '../CartProduct/CartProduct';
import FormField from '../../../UI/Form/FormField/FormField';
import priceProvider from '../../Price/priceProvider';
import {getCartTotalPrice} from '../../../../redux/reducer/utils';

function CartTable({products, formatPrice}) {
    const foo = () => {
        console.log('lala');
    };
    return (
        <>
            <div className="rw-cart-table">
                {products.map(product => {
                    return (
                        <div className="rw-cart-table__row" key={product.id}>
                            <div className="rw-cart-table__delete" onClick={foo}>
                                <Icon classes={['fa-times']}/>
                            </div>
                            <div className="rw-cart-table__product">
                                <CartProduct product={product}/>
                            </div>
                            <div className="rw-cart-table__quantity">
                                <FormField value={product.quantity} onChange={foo} type="number"/>
                            </div>
                            <div className="rw-cart-table__price">
                                {formatPrice(product.price * product.quantity)}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{textAlign: 'right', fontWeight: 'bold', marginTop: '20px'}}>
                Total: {formatPrice(getCartTotalPrice(products))}
            </div>
        </>
    );
}

export default priceProvider(CartTable);