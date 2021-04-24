import React, { FC, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import { ICartItem, orderApi } from 'app-data'
import { Simulate } from 'react-dom/test-utils'
import input = Simulate.input
import {
  IDeliveryMethod,
  IPaymentMethod,
} from '../../../../data/order/orderTypes'

interface IProps {
  cartItems: ICartItem[]
}

const CheckoutForm: FC<IProps> = (props) => {
  const { cartItems } = props
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])

  useEffect(() => {
    Promise.all([
      orderApi.fetchDeliveryMethods(),
      orderApi.fetchPaymentMethods(),
    ])
      .then(([delivery, payment]) => {
        setDeliveryMethods(delivery)
        setPaymentMethods(payment)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  const submitForm = (e: any) => {
    e.preventDefault()
    orderApi.createOrder(e.target, cartItems)
  }

  const setValue = () => {
    console.log('value')
  }

  return (
    <form action="" onSubmit={submitForm}>
      <fieldset>
        <legend>Billing & Shipping</legend>
        <br />
        <br />
        <div>
          <span>billing_first_name</span>
          <input
            type="text"
            name="billing_first_name"
            placeholder="First name"
            value="Andriy"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_last_name</span>
          <input
            type="text"
            name="billing_last_name"
            placeholder="Last name"
            value="Shabat"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_country</span>
          <input
            type="text"
            name="billing_country"
            placeholder="Country"
            value="UA"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_city</span>
          <input
            type="text"
            name="billing_city"
            placeholder="Address"
            value="Lviv"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_address_1</span>
          <input
            type="text"
            name="billing_address_1"
            placeholder="Address"
            value="Antonycha"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_phone</span>
          <input
            type="text"
            name="billing_phone"
            placeholder="Address"
            value="0988165441"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>billing_email</span>
          <input
            type="text"
            name="billing_email"
            placeholder="Address"
            value="ad1@min.com"
            onChange={setValue}
          />
        </div>
        <br />
        <div>
          <span>delivery</span>
          {deliveryMethods.map((method) => {
            return (
              <div key={method.id}>
                <label>
                  <span>{method.title}</span>
                  <input type="radio" name="delivery" />
                </label>
              </div>
            )
          })}
        </div>
        <br />
        <div>
          <span>payment</span>
          {paymentMethods.map((method) => {
            return (
              <div key={method.id}>
                <label>
                  <span>{method.title}</span>
                  <input type="radio" name="payment_method" value={method.id} />
                </label>
              </div>
            )
          })}
        </div>
      </fieldset>
      <div>
        <Button size="lg" color="secondary">
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CheckoutForm
