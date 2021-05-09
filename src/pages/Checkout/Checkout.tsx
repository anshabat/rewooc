import './Checkout.scss'
import React from 'react'
import Content from '../../components/Layout/Content/Content'
import CheckoutForm from '../../components/shop/checkout/CheckoutForm/CheckoutForm'
import CheckoutTotals from '../../components/shop/checkout/CheckoutTotals/CheckoutTotals'
import { useCheckout } from '../../hooks/useCheckout'

const Checkout: React.FC = () => {
  const { total, delivery, setDeliveryMethod, loading } = useCheckout()

  return (
    <Content title="Checkout">
      <div className="rw-checkout">
        <CheckoutForm onUpdateDelivery={setDeliveryMethod} />
        <CheckoutTotals total={total} delivery={delivery} loading={loading} />
      </div>
    </Content>
  )
}
export default Checkout
