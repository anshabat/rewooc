import React, { FC, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import FormField from '../../../UI/Form/FormField/FormField'
import { orderApi, ICartItem, IDeliveryMethod, IPaymentMethod } from 'app-data'

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
    orderApi.createOrder(e.target, cartItems).then((orderId) => {
      console.log(orderId)
    })
  }

  const setValue = () => {
    console.log('value')
  }

  return (
    <form className="rw-form" action="" onSubmit={submitForm}>
      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Contact info</legend>

        <div className="rw-form__field">
          <label htmlFor="billing_first_name" className="rw-form__label">
            First name
          </label>
          <div className="rw-form__control">
            <FormField
              name="billing_first_name"
              id="billing_first_name"
              type="text"
              value="Andriy"
              onChange={setValue}
            />
          </div>
        </div>

        <div className="rw-form__field">
          <label htmlFor="billing_last_name" className="rw-form__label">
            Last name
          </label>
          <div className="rw-form__control">
            <FormField
              name="billing_last_name"
              id="billing_last_name"
              type="text"
              value="Shabat"
              onChange={setValue}
            />
          </div>
        </div>

        <div className="rw-form__field">
          <label htmlFor="billing_phone" className="rw-form__label">
            Phone
          </label>
          <div className="rw-form__control">
            <FormField
              name="billing_phone"
              id="billing_phone"
              type="text"
              value="0988165441"
              onChange={setValue}
            />
          </div>
        </div>

        <div className="rw-form__field">
          <label htmlFor="billing_email" className="rw-form__label">
            Email
          </label>
          <div className="rw-form__control">
            <FormField
              name="billing_email"
              id="billing_email"
              type="text"
              value="ad1@min.com"
              onChange={setValue}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Shipping & Payment</legend>

        <div className="rw-form__field">
          <label htmlFor="delivery" className="rw-form__label">
            Delivery
          </label>
          <div className="rw-form__control">
            {deliveryMethods.map((method) => {
              return (
                <div key={method.id}>
                  <label>
                    <span>{method.title}</span>
                    <input
                      type="radio"
                      name="delivery"
                      id="delivery"
                      value={method.id}
                    />{' '}
                    ({method.cost})
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rw-form__field">
          <label htmlFor="payment" className="rw-form__label">
            Payment
          </label>
          <div className="rw-form__control">
            {paymentMethods.map((method) => {
              return (
                <div key={method.id}>
                  <label>
                    <span>{method.title}</span>
                    <input
                      type="radio"
                      name="payment"
                      id="payment"
                      value={method.id}
                    />
                  </label>
                </div>
              )
            })}
          </div>
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
