import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import { checkoutApi, orderApi, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Space from '../../../UI/Space/Space'
import Form from '../../../UI/Form/Form'

interface IFormField<T> {
  value: T
  validation: {
    required: boolean
    valid: boolean
  }
}

function setFormField<T>(
  value: T,
  required: boolean,
  valid: boolean
): IFormField<T> {
  return {
    value,
    validation: {
      required,
      valid,
    },
  }
}

const initialFormState = {
  billing_first_name: setFormField('', true, true),
  billing_last_name: setFormField('', true, true),
  billing_phone: setFormField('', true, true),
  billing_email: setFormField('', true, true),
  deliveryMethodId: setFormField('', true, true),
  payment: setFormField('', true, true),
  ship_to_different_address: setFormField(0, false, true),
  shipping_first_name: setFormField('', false, true),
  shipping_last_name: setFormField('', false, true),
}

//export type CheckoutFormType = typeof initialFormState
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
          formData.deliveryMethodId.value
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

    const newFormData = Object.entries(formData).reduce<CheckoutFormType>(
      (result, field) => {
        const [key, data] = field as [keyof CheckoutFormType, IFormField<any>]
        let isValid = true

        if (data.validation.required) {
          isValid = Boolean(data.value)
        }

        result[key] = setFormField(
          data.value,
          data.validation.required,
          isValid
        )

        return result
      },
      {} as CheckoutFormType
    )
    setFormData(newFormData)
  }

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof CheckoutFormType
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: { ...formData[name], value },
    })
  }

  const setCheckValue = (e: any) => {
    const name = e.target.name as keyof CheckoutFormType
    const checked = Number(e.target.checked)
    setFormData({
      ...formData,
      [name]: { ...formData[name], value: checked },
    })
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
            value={formData.billing_first_name.value}
            required={formData.billing_first_name.validation.required}
            valid={formData.billing_first_name.validation.valid}
            onChange={setValue}
          />
          <FormField
            label="Last name"
            name="billing_last_name"
            id="billing_last_name"
            type="text"
            value={formData.billing_last_name.value}
            required={formData.billing_last_name.validation.required}
            valid={formData.billing_last_name.validation.valid}
            onChange={setValue}
          />
          <FormField
            label="Phone"
            name="billing_phone"
            id="billing_phone"
            type="text"
            value={formData.billing_phone.value}
            required={formData.billing_phone.validation.required}
            valid={formData.billing_phone.validation.valid}
            onChange={setValue}
          />
          <FormField
            label="Email"
            name="billing_email"
            id="billing_email"
            type="text"
            value={formData.billing_email.value}
            required={formData.billing_email.validation.required}
            valid={formData.billing_email.validation.valid}
            onChange={setValue}
          />
          <FormField
            label="Ship to another person"
            horizontal
            name="ship_to_different_address"
            id="ship_to_different_address"
            type="checkbox"
            value={formData.ship_to_different_address.value}
            required={formData.ship_to_different_address.validation.required}
            valid={formData.ship_to_different_address.validation.valid}
            onChange={setCheckValue}
            checked={Boolean(formData.ship_to_different_address.value)}
          />
          {formData.ship_to_different_address.value ? (
            <>
              <FormField
                label="First Name"
                name="shipping_first_name"
                id="shipping_first_name"
                type="text"
                value={formData.shipping_first_name.value}
                required={formData.shipping_first_name.validation.required}
                valid={formData.shipping_first_name.validation.valid}
                onChange={setValue}
              />
              <FormField
                label="Phone"
                name="shipping_last_name"
                id="shipping_last_name"
                type="text"
                value={formData.shipping_last_name.value}
                required={formData.shipping_last_name.validation.required}
                valid={formData.shipping_last_name.validation.valid}
                onChange={setValue}
              />
            </>
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
                  required={formData.deliveryMethodId.validation.required}
                  valid={formData.deliveryMethodId.validation.valid}
                  checked={
                    Number(formData.deliveryMethodId.value) === method.id
                  }
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
                  required={formData.payment.validation.required}
                  valid={formData.payment.validation.valid}
                  checked={formData.payment.value === method.id}
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
