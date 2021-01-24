import './MiniCart.scss'
import React from 'react'
import Price from '../../Price/Price'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../../../redux/cart/cartSelectors'

function MiniCart() {
  const quantity = useSelector(selectCartTotalQuantity)
  const total = useSelector(selectCartTotalPrice)
  const dispatch = useDispatch()

  return (
    <div className="rw-mini-cart">
      Cart: {quantity} - <Price value={total} />
      <button
        onClick={() => {
          dispatch({ type: 'TEST' })
        }}
      >
        test
      </button>
    </div>
  )
}

export default MiniCart
