import './OrderCart.scss'
import React, { ChangeEvent, FC } from 'react'
import { ICartItem } from 'app-data'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectDeletingProductKey,
  selectQuantityKey,
} from '../../../../redux/cart/cartSelectors'
import Image from '../../../UI/Image/Image'
import {
  deleteFromCart,
  setCartProductQuantity,
} from '../../../../redux/cart/cartActions'
import Icon from '../../../UI/Icon/Icon'
import QuantityField from '../QuantityField/QuantityField'
import Price from '../../Price/Price'

interface IProps {
  items: ICartItem[]
}

const OrderCart: FC<IProps> = (props) => {
  const { items } = props
  const deletingProduct = useSelector(selectDeletingProductKey)
  const changingQuantity = useSelector(selectQuantityKey)
  const dispatch = useDispatch()

  return (
    <ul className="rw-order-cart">
      {items.map((item) => {
        return (
          <li className="rw-order-cart__item" key={item.key}>
            <div className="rw-order-cart__image">
              <Image image={item.product.images.thumbnail} />
            </div>
            <h3 className="rw-order-cart__title">{item.product.title}</h3>
            <div className="rw-order-cart__delete">
              <button
                className="rw-order-cart__delete-btn"
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
            <div className="rw-order-cart__quantity">
              <div className="rw-order-cart__quantity-control">
                <QuantityField
                  initialValue={item.quantity}
                  onBlur={(e: ChangeEvent<HTMLInputElement>) => {
                    dispatch(
                      setCartProductQuantity(item.key, Number(e.target.value))
                    )
                  }}
                  disabled={Boolean(changingQuantity)}
                  hasChanged={item.key === changingQuantity}
                />
              </div>
              <span>x</span>
              <Price value={item.product.price} />
            </div>
            <div className="rw-order-cart__price">
              <Price value={item.totalPrice} />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default OrderCart
