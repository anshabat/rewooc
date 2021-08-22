import './CartTable.scss'
import React, { ChangeEvent, FC, Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CartProduct from '../CartProduct/CartProduct'
import QuantityField from '../QuantityField/QuantityField'
import {
  selectCartTotalPrice,
  selectDeletingProductKey,
  selectQuantityKey,
} from '../../../../redux/cart/cartSelectors'
import {
  deleteFromCart,
  setCartProductQuantity,
} from '../../../../redux/cart/cartActions'
import Price from '../../Price/Price'
import { ICartItem } from 'app-api'
import DeleteButton from '../../../UI/DeleteButton/DeleteButton'

interface IProps {
  items: ICartItem[]
}

const CartTable: FC<IProps> = (props) => {
  const { items } = props

  const total = useSelector(selectCartTotalPrice)
  const deletingProduct = useSelector(selectDeletingProductKey)
  const changingQuantity = useSelector(selectQuantityKey)
  const dispatch = useDispatch()

  return (
    <>
      <div className="rw-cart-table">
        {items.map((item) => {
          return (
            <Fragment key={item.key}>
              <div className="rw-cart-table__delete">
                <DeleteButton
                  isLoading={deletingProduct === item.key}
                  onDelete={() => {
                    dispatch(deleteFromCart(item.key))
                  }}
                />
              </div>
              <div className="rw-cart-table__product">
                {item.product && <CartProduct product={item.product} />}
              </div>
              <div className="rw-cart-table__quantity">
                {changingQuantity && <span>changing</span>}
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
              <div className="rw-cart-table__price">
                <Price value={item.totalPrice} />
              </div>
            </Fragment>
          )
        })}
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
