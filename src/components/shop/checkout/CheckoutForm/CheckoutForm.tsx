import React, { FC, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import FormField from '../../../UI/Form/FormField/FormField'
import { orderApi, ICartItem, IDeliveryMethod, IPaymentMethod } from 'app-data'

interface IProps {
  cartItems: ICartItem[]
}

export interface ICheckoutForm {
  billing_first_name: string,
  billing_last_name: string,
  billing_phone: string,
  billing_email: string,
  delivery: string,
  payment: string,
}

const CheckoutForm: FC<IProps> = (props) => {
  const { cartItems } = props

  /* Checkout page data */
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])

  /* Form state */
  const [formData, setFormData] = useState<ICheckoutForm>({
    billing_first_name: '',
    billing_last_name: '',
    billing_phone: '',
    billing_email: '',
    delivery: '',
    payment: '',
  })

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
    return orderApi.createOrder(formData, cartItems)
  }

  const setValue = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
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
              value={formData.billing_first_name}
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
              value={formData.billing_last_name}
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
              value={formData.billing_phone}
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
              value={formData.billing_email}
              onChange={setValue}
            />
          </div>
        </div>
      </fieldset>

      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Shipping & Payment</legend>

        <div className="rw-form__field">
          <div className="rw-form__label">Delivery</div>
          <div className="rw-form__control">
            {deliveryMethods.map((method) => {
              return (
                <div key={method.id}>
                  <label>
                    <span>{method.title}</span>
                    <input
                      type="radio"
                      name="delivery"
                      value={method.id}
                      checked={Number(formData.delivery) === method.id}
                      onChange={setValue}
                    />{' '}
                    ({method.cost})
                  </label>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rw-form__field">
          <div className="rw-form__label">Payment</div>
          <div className="rw-form__control">
            {paymentMethods.map((method) => {
              return (
                <div key={method.id}>
                  <label>
                    <span>{method.title}</span>
                    <input
                      type="radio"
                      name="payment"
                      value={method.id}
                      checked={formData.payment === method.id}
                      onChange={setValue}
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
