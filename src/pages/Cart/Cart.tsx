import React from 'react'
import { useSelector } from 'react-redux'
import connectPage from '../connectPage'
import CartTable from '../../components/shop/cart/CartTable/CartTable'
import { loadCartPage } from '../../redux/cart/cartActions'
import Content from '../../components/Layout/Content/Content'
import ContentLoader from '../../components/UI/loaders/ContentLoader/ContentLoader'
import {
  selectCartItems,
  selectCartProcess,
} from '../../redux/cart/cartSelectors'

const Cart = () => {
  const { title, loading } = useSelector(selectCartProcess)
  const CartItems = useSelector(selectCartItems)

  if (loading) return <ContentLoader />

  return (
    <Content title={title}>
      {CartItems.length > 0 ? (
        <CartTable items={CartItems} />
      ) : (
        <p>Cart is empty</p>
      )}
    </Content>
  )
}

export default connectPage(loadCartPage)(Cart)
