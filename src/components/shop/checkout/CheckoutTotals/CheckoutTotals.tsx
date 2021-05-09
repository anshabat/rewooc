import './CheckoutTotals.scss'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import {
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../../../redux/cart/cartSelectors'
import Price from '../../Price/Price'
import { IDeliveryMethod } from 'app-data'
import OrderCart from '../../cart/OrderCart/OrderCart'
import Loader from '../../../UI/loaders/Loader/Loader'

interface IProps {
  total: number | null
  delivery: IDeliveryMethod | null
  loading: boolean
}

const CheckoutTotals: FC<IProps> = (props) => {
  const { total, delivery, loading } = props
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
      {loading ? (
        <Loader />
      ) : (
        <dl className="rw-cart-totals__fees">
          <dt>Total</dt>
          <dd>
            <strong>{total ? <Price value={total} /> : '...'}</strong>
          </dd>
        </dl>
      )}
    </div>
  )
}

export default CheckoutTotals
