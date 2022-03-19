import './CheckoutTotals.scss'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { IDeliveryMethod } from 'api'
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../../../redux/cart/cartSelectors'
import Price from '../../Price/Price'
import OrderCart from '../../cart/OrderCart/OrderCart'
import { useCheckoutTotal } from '../../../../hooks/useCheckoutTotal'

interface IProps {
  delivery: IDeliveryMethod | null
}

const CheckoutTotals: FC<IProps> = (props) => {
  const { delivery } = props
  const total = useCheckoutTotal(delivery)
  const cartItems = useSelector(selectCartItems)
  const subtotal = useSelector(selectCartTotalPrice)
  const count = useSelector(selectCartTotalQuantity)

  return (
    <div className="rw-cart-totals">
      <ul className="rw-cart-totals__products">
        <h3 className="rw-cart-totals__products-title">
          You have {count} products in the cart
        </h3>
        <OrderCart items={cartItems} />
      </ul>
      <dl className="rw-cart-totals__fees">
        <dt>Subtotal</dt>
        <dd>
          <Price value={subtotal} />
        </dd>
        <dt>Delivery</dt>
        <dd>{delivery?.cost ?? 'Unknown'}</dd>
      </dl>
      <dl className="rw-cart-totals__fees">
        <dt>Total</dt>
        <dd>
          <strong>{total ? <Price value={total} /> : '...'}</strong>
        </dd>
      </dl>
    </div>
  )
}

export default CheckoutTotals
