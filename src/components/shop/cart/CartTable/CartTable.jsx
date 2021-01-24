import './CartTable.scss'
import React, { Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Icon from '../../../UI/Icon/Icon'
import CartProduct from '../CartProduct/CartProduct'
import QuantityField from '../QuantityField/QuantityField'
import { selectCartTotalPrice } from '../../../../redux/cart/cartSelectors'
import {
  deleteFromCart,
  setCartProductQuantity,
} from '../../../../redux/cart/cartActions'
import Price from '../../Price/Price'

function CartTable(props) {
  const { items } = props

  const total = useSelector(selectCartTotalPrice)
  const deletingProduct = useSelector((state) => state.cart.deletingProductKey)
  const changingQuantity = useSelector(
    (state) => state.cart.changingQuantityKey
  )
  const dispatch = useDispatch()

  return (
    <>
      <div className="rw-cart-table">
        {items.map((item) => (
          <Fragment key={item.key}>
            <div className="rw-cart-table__delete">
              <button
                className="rw-cart-table__delete-btn"
                type="button"
                onClick={() => {
                  dispatch(deleteFromCart(item.key))
                }}
              >
                {deletingProduct === item.key ? (
                  <Icon classes={['fa-circle-o-notch', 'fa-spin']} />
                ) : (
                  <Icon classes={['fa-times']} />
                )}
              </button>
            </div>
            <div className="rw-cart-table__product">
              {item.product && <CartProduct product={item.product} />}
            </div>
            <div className="rw-cart-table__quantity">
              {changingQuantity && <span>changing</span>}
              <QuantityField
                value={item.quantity}
                onBlur={(e) =>
                  dispatch(setCartProductQuantity(item.key, e.target.value))
                }
                disabled={changingQuantity}
                hasChanged={item.key === changingQuantity}
              />
            </div>
            <div className="rw-cart-table__price">
              <Price value={item.totalPrice} />
            </div>
          </Fragment>
        ))}
      </div>
      <div
        style={{ textAlign: 'right', fontWeight: 'bold', marginTop: '20px' }}
      >
        Total: <Price value={total} />
      </div>
    </>
  )
}

export default CartTable
