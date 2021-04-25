import './Checkout.scss'
import React from 'react'
import Content from '../../components/Layout/Content/Content'
import CheckoutForm from '../../components/shop/checkout/CheckoutForm/CheckoutForm'
import CheckoutTotals from '../../components/shop/checkout/CheckoutTotals/CheckoutTotals'

const Checkout: React.FC = () => {
  return (
    <Content title="Checkout">
      <div className="rw-checkout">
        <CheckoutForm />
        <CheckoutTotals />
      </div>
    </Content>
  )
}
export default Checkout
