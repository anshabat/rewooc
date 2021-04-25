import React, { FC, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import { orderApi } from 'app-data'

const CheckoutTotals: FC = () => {
  const cartItems = useSelector(selectCartItems)

  useEffect(() => {
    orderApi.fetchTotals(cartItems).then((total) => {
      console.log(total)
    })
  }, [])

  return (
    <div className="rw-cart-totals">
      <ul className="rw-cart-totals__products">
        {cartItems.map((item) => {
          return (
            <li key={item.key}>
              {item.product.title} - {item.quantity} - {item.totalPrice}
            </li>
          )
        })}
      </ul>
      <br />
      <br />
      <dl className="rw-cart-totals__list">
        <dt>Subtotal</dt>
        <dd>-</dd>
        <dt>Delivery</dt>
        <dd>-</dd>
      </dl>
      <br />
      <br />
      <dl className="rw-cart-totals__result">
        <dt>Total</dt>
        <dd>-</dd>
      </dl>
    </div>
  )
}

export default CheckoutTotals
