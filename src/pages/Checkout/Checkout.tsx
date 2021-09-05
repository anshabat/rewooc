import './Checkout.scss'
import React, { useState } from 'react'
import Content from '../../components/Layout/Content/Content'
import CheckoutForm from '../../components/shop/checkout/CheckoutForm/CheckoutForm'
import CheckoutTotals from '../../components/shop/checkout/CheckoutTotals/CheckoutTotals'
import { IDeliveryMethod } from 'app-api'

const Checkout: React.FC = () => {
  const [delivery, setDeliveryMethod] = useState<IDeliveryMethod | null>(null)

  return (
    <Content title="Checkout">
      <div className="rw-checkout">
        <CheckoutForm onUpdateDelivery={setDeliveryMethod} delivery={delivery} />
        <CheckoutTotals delivery={delivery} />
      </div>
    </Content>
  )
}
export default Checkout
