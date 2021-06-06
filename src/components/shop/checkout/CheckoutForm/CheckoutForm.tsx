import React, { FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import { checkoutApi, orderApi, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Space from '../../../UI/Space/Space'
import Form from '../../../UI/Form/Form'

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

  const submitForm = (e: FormEvent) => {
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
    <Form onSubmit={submitForm} loading={isOrderLoading}>
      <Form.Fieldset>
        <Form.Legend>Contact info</Form.Legend>
        <Form.Fields>
          <FormField
            label="First name"
            name="billing_first_name"
            id="billing_first_name"
            type="text"
            value={formData.billing_first_name}
            onChange={setValue}
          />
          <FormField
            label="Last name"
            name="billing_last_name"
            id="billing_last_name"
            type="text"
            value={formData.billing_last_name}
            onChange={setValue}
          />
          <FormField
            label="Phone"
            name="billing_phone"
            id="billing_phone"
            type="text"
            value={formData.billing_phone}
            onChange={setValue}
          />
          <FormField
            label="Email"
            name="billing_email"
            id="billing_email"
            type="text"
            value={formData.billing_email}
            onChange={setValue}
          />
          <FormField
            label="Ship to another person"
            horizontal
            name="ship_to_different_address"
            id="ship_to_different_address"
            type="checkbox"
            value={formData.ship_to_different_address}
            onChange={setCheckValue}
            checked={Boolean(formData.ship_to_different_address)}
          />
          {formData.ship_to_different_address ? (
            <FormField
              label="First Name"
              name="shipping_first_name"
              id="shipping_first_name"
              type="text"
              value={formData.shipping_first_name}
              onChange={setValue}
            />
          ) : null}
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Delivery</Form.Legend>
        <Form.Fields>
          <Space size="sm">
            {deliveryMethods.map((method) => {
              return (
                <FormField
                  key={method.id}
                  label={`${method.title} ${method.cost}`}
                  horizontal
                  name="deliveryMethodId"
                  id={`deliveryMethodId-${method.id}`}
                  type="radio"
                  value={method.id}
                  onChange={setValue}
                  checked={Number(formData.deliveryMethodId) === method.id}
                />
              )
            })}
          </Space>
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Payment</Form.Legend>
        <Form.Fields>
          <Space size="sm">
            {paymentMethods.map((method) => {
              return (
                <FormField
                  key={method.id}
                  label={method.title}
                  horizontal
                  name="payment"
                  id={`payment-${method.id}`}
                  type="radio"
                  value={method.id}
                  onChange={setValue}
                  checked={formData.payment === method.id}
                />
              )
            })}
          </Space>
        </Form.Fields>
      </Form.Fieldset>
      <div>
        <Button size="lg" color="secondary" disabled={isOrderLoading}>
          Submit
        </Button>
      </div>
    </Form>
  )
}

export default CheckoutForm
