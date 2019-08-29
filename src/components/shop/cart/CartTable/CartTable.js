import React from 'react';
import SectionPrimary from '../../../UI/sections/SectionPrimary/SectionPrimary';
import Icon from '../../../UI/Icon/Icon';
import CartProduct from '../CartProduct/CartProduct';

function CartTable({products, totals}) {
    console.log(products);
    return (
        <SectionPrimary title="Подробности заказа">
            <div className="rw-cart-table">
                {products.map(product => {
                   return (
                       <div className="rw-cart-table__row" key={product.key}>
                           <div className="rw-cart-table__delete">
                               <Icon classes={['fa-times']} />
                           </div>
                           <div className="rw-cart-table__product">
                               <CartProduct product={product} />
                           </div>
                           <div className="rw-cart-table__quantity">

                           </div>
                           <div className="rw-cart-table__price">

                           </div>
                       </div>
                   )
                })}
            </div>
        </SectionPrimary>
    );
}

export default CartTable;