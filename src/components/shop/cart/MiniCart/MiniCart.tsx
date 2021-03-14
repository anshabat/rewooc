import './MiniCart.scss'
import React from 'react'
import Price from '../../Price/Price'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../../../redux/cart/cartSelectors'
import { AppStateType } from '../../../../redux/store'

function MiniCart() {
  const quantity = useSelector<AppStateType, number>(selectCartTotalQuantity)
  const total = useSelector<AppStateType, number>(selectCartTotalPrice)
  const dispatch = useDispatch()

  return (
    <div className="rw-mini-cart">
      Cart: {quantity} - <Price value={total} />
      <button
        onClick={() => {
          dispatch({ type: 'TEST' })
        }}
        type="button"
      >
        test
      </button>
    </div>
  )
}

export default MiniCart
