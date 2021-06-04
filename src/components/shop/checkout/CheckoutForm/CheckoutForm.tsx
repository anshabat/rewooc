import React, { FC, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import FormElement from '../../../UI/Form/FormElement/FormElement'
import { checkoutApi, orderApi, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Space from '../../../UI/Space/Space'

const initialFormState = {
  billing_first_name: '',
  billing_last_name: '',
  billing_phone: '',
  billing_email: '',
  deliveryMethodId: '',
  payment: '',
  ship_to_different_address: 0,
  shipping_first_name: '',
}

export type CheckoutFormType = typeof initialFormState

interface IProps {
  onUpdateDelivery?: (deliveryMethod: IDeliveryMethod) => void
  onCreateOrder?: (orderData: CheckoutFormType) => void
}

const CheckoutForm: FC<IProps> = (props) => {
  const { onUpdateDelivery } = props
  const cartItems = useSelector(selectCartItems)
  const [isOrderLoading, setOrderLoading] = useState(false)

  /* Checkout page data */
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])

  /* Form state */
  const [formData, setFormData] = useState<CheckoutFormType>(initialFormState)

  useEffect(() => {
    Promise.all([
      checkoutApi.fetchDeliveryMethods(),
      checkoutApi.fetchPaymentMethods(),
    ])
      .then(([delivery, payment]) => {
        setDeliveryMethods(delivery)
        setPaymentMethods(payment)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  /* Update delivery */
  if (typeof onUpdateDelivery === 'function') {
    useEffect(() => {
      if (formData.deliveryMethodId !== initialFormState.deliveryMethodId) {
        const currentDeliveryMethod = getDeliveryByMethodId(
          formData.deliveryMethodId
        )
        if (currentDeliveryMethod) {
          onUpdateDelivery(currentDeliveryMethod)
        }
      }
    }, [formData.deliveryMethodId])
  }

  const getDeliveryByMethodId = (id: string): IDeliveryMethod | undefined => {
    return deliveryMethods.find((method) => String(method.id) === id)
  }

  const submitForm = (e: any) => {
    e.preventDefault()
    setOrderLoading(true)
    return orderApi.createOrder(formData, cartItems).finally(() => {
      setOrderLoading(false)
    })
  }

  const setValue = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const setCheckValue = (e: any) => {
    setFormData({ ...formData, [e.target.name]: Number(e.target.checked) })
  }

  return (
    <form className="rw-form" action="" onSubmit={submitForm}>
      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Contact info</legend>
        <div className="rw-form__field">
          <FormField label="First name">
            <FormElement
              name="billing_first_name"
              id="billing_first_name"
              type="text"
              value={formData.billing_first_name}
              onChange={setValue}
            />
          </FormField>
        </div>
        <div className="rw-form__field">
          <FormField label="Last name">
            <FormElement
              name="billing_last_name"
              id="billing_last_name"
              type="text"
              value={formData.billing_last_name}
              onChange={setValue}
            />
          </FormField>
        </div>

        <div className="rw-form__field">
          <FormField label="Phone">
            <FormElement
              name="billing_phone"
              id="billing_phone"
              type="text"
              value={formData.billing_phone}
              onChange={setValue}
            />
          </FormField>
        </div>

        <div className="rw-form__field">
          <FormField label="Email">
            <FormElement
              name="billing_email"
              id="billing_email"
              type="text"
              value={formData.billing_email}
              onChange={setValue}
            />
          </FormField>
        </div>

        <div className="rw-form__field">
          <FormField label="Ship to another person" direction="horizontal">
            <FormElement
              name="ship_to_different_address"
              id="ship_to_different_address"
              type="checkbox"
              value={formData.ship_to_different_address}
              onChange={setCheckValue}
              checked={Boolean(formData.ship_to_different_address)}
            />
          </FormField>
        </div>

        {formData.ship_to_different_address ? (
          <div className="rw-form__field">
            <FormField label="First Name">
              <FormElement
                name="shipping_first_name"
                id="shipping_first_name"
                type="text"
                value={formData.shipping_first_name}
                onChange={setValue}
              />
            </FormField>
          </div>
        ) : null}
      </fieldset>

      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Delivery</legend>

        <div className="rw-form__field">
          <Space size="sm">
            {deliveryMethods.map((method) => {
              return (
                <FormField
                  key={method.id}
                  label={`${method.title} ${method.cost}`}
                  direction="horizontal"
                >
                  <FormElement
                    name="deliveryMethodId"
                    id="deliveryMethodId"
                    type="radio"
                    value={method.id}
                    onChange={setValue}
                    checked={Number(formData.deliveryMethodId) === method.id}
                  />
                </FormField>
              )
            })}
          </Space>
        </div>
      </fieldset>

      <fieldset className="rw-form__group">
        <legend className="rw-form__group-title">Payment</legend>
        <div className="rw-form__field">
          <Space size="sm">
            {paymentMethods.map((method) => {
              return (
                <FormField
                  key={method.id}
                  label={method.title}
                  direction="horizontal"
                >
                  <FormElement
                    name="payment"
                    id="payment"
                    type="radio"
                    value={method.id}
                    onChange={setValue}
                    checked={formData.payment === method.id}
                  />
                </FormField>
              )
            })}
          </Space>
        </div>
      </fieldset>
      <div>
        <Button size="lg" color="secondary" disabled={isOrderLoading}>
          Submit
        </Button>
      </div>
    </form>
  )
}

export default CheckoutForm
