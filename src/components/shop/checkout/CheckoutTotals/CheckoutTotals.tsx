import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotalPrice,
} from '../../../../redux/cart/cartSelectors'
import Price from '../../Price/Price'
import { IDeliveryMethod } from 'app-data'

interface IProps {
  total: number | null
  delivery: IDeliveryMethod | null
}

const CheckoutTotals: FC<IProps> = (props) => {
  const { total, delivery } = props
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotalPrice)

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
        <dd>
          <Price value={subtotal} />
        </dd>
        {delivery && (
          <>
            <dt>Delivery</dt>
            <dd>{delivery.cost}</dd>
          </>
        )}
      </dl>
      <br />
      <br />

      <dl className="rw-cart-totals__result">
        <dt>Total</dt>
        <dd>{total ? <Price value={total} /> : '...'}</dd>
      </dl>
    </div>
  )
}

export default CheckoutTotals
