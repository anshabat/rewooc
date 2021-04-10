import './Checkout.scss'
import React from 'react'
import Content from '../../components/Layout/Content/Content'
import CheckoutForm from '../../components/shop/checkout/CheckoutForm/CheckoutForm'
import CheckoutTotals from '../../components/shop/checkout/CheckoutTotals/CheckoutTotals'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../redux/cart/cartSelectors'

const Checkout: React.FC = () => {
  const cartItems = useSelector(selectCartItems)
  return (
    <Content title="Checkout">
      <div className="rw-checkout">
        <CheckoutForm cartItems={cartItems} />
        <CheckoutTotals />
      </div>
    </Content>
  )
}
export default Checkout
