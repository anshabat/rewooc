import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import Button from '../../../UI/Button/Button'
import { checkoutApi, orderApi, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Form from '../../../UI/Form/Form'
import ChoiceGroup from '../../../UI/Form/ChoiceGroup/ChoiceGroup'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'

interface IValidationRules {
  required?: boolean
  email?: boolean
}

interface IFormField<T> {
  value: T
  validation: IValidationRules
  error: string
}

function setFormField<T>(
  value: T,
  validation: IValidationRules = {},
  error = ''
): IFormField<T> {
  return {
    value,
    validation,
    error,
  }
}

const initialFormState = {
  billing_first_name: setFormField('', { required: true }),
  billing_last_name: setFormField('', { required: true }),
  billing_phone: setFormField('', { required: true }),
  billing_email: setFormField('', { email: true }),
  deliveryMethodId: setFormField('', { required: true }),
  payment: setFormField('', { required: true }),
  ship_to_different_address: setFormField(0),
  shipping_first_name: setFormField(''),
  shipping_last_name: setFormField(''),
  order_note: setFormField(''),
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

  const validate = (formData: CheckoutFormType): boolean => {
    let isFormValid = true

    const newFormData = Object.entries(formData).reduce<CheckoutFormType>(
      (result, field) => {
        const [key, data] = field as [keyof CheckoutFormType, IFormField<any>]
        let error = ''

        /* required validation */
        if (data.validation.required) {
          error = Boolean(data.value) ? '' : 'Field is required'
        }

        /* email validation */
        if (data.validation.email && data.value) {
          error = /^(.+)@(.+)\.([a-z]+)$/.test(data.value)
            ? ''
            : 'Enter correct email address'
        }

        if (error) {
          isFormValid = false
        }

        result[key] = setFormField(data.value, data.validation, error)

        return result
      },
      {} as CheckoutFormType
    )
    setFormData(newFormData)

    return isFormValid
  }

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isFormValid = validate(formData)

    if (isFormValid) {
      setOrderLoading(true)
      return orderApi.createOrder(formData, cartItems).finally(() => {
        setOrderLoading(false)
        setFormData(initialFormState)
      })
    }
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
            error={formData.billing_first_name.error}
            onChange={setValue}
          />
          <FormField
            label="Last name"
            name="billing_last_name"
            id="billing_last_name"
            type="text"
            value={formData.billing_last_name.value}
            required={formData.billing_last_name.validation.required}
            error={formData.billing_last_name.error}
            onChange={setValue}
          />
          <FormField
            label="Phone"
            name="billing_phone"
            id="billing_phone"
            type="text"
            value={formData.billing_phone.value}
            required={formData.billing_phone.validation.required}
            error={formData.billing_phone.error}
            onChange={setValue}
          />
          <FormField
            label="Email"
            name="billing_email"
            id="billing_email"
            type="text"
            value={formData.billing_email.value}
            required={formData.billing_email.validation.required}
            error={formData.billing_email.error}
            onChange={setValue}
          />
          <ChoiceField
            label="Ship to another person"
            name="ship_to_different_address"
            type="checkbox"
            value={formData.ship_to_different_address.value}
            required={formData.ship_to_different_address.validation.required}
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
                error={formData.shipping_first_name.error}
                onChange={setValue}
              />
              <FormField
                label="Last Name"
                name="shipping_last_name"
                id="shipping_last_name"
                type="text"
                value={formData.shipping_last_name.value}
                required={formData.shipping_last_name.validation.required}
                error={formData.shipping_last_name.error}
                onChange={setValue}
              />
            </>
          ) : null}
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Delivery</Form.Legend>
        <Form.Fields>
          <ChoiceGroup
            items={deliveryMethods}
            error={formData.deliveryMethodId.error}
          >
            {(method) => {
              return (
                <ChoiceField
                  key={method.id}
                  label={`${method.title} ${method.cost}`}
                  name="deliveryMethodId"
                  type="radio"
                  value={method.id}
                  onChange={setValue}
                  required={formData.deliveryMethodId.validation.required}
                  checked={
                    Number(formData.deliveryMethodId.value) === method.id
                  }
                />
              )
            }}
          </ChoiceGroup>
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Payment</Form.Legend>
        <Form.Fields>
          <ChoiceGroup items={paymentMethods} error={formData.payment.error}>
            {(method) => {
              return (
                <ChoiceField
                  key={method.id}
                  label={method.title}
                  name="payment"
                  type="radio"
                  value={method.id}
                  onChange={setValue}
                  required={formData.payment.validation.required}
                  checked={formData.payment.value === method.id}
                />
              )
            }}
          </ChoiceGroup>
        </Form.Fields>
      </Form.Fieldset>
      <Form.Fieldset>
        <Form.Legend>Order notes</Form.Legend>
        <Form.Fields>
          <FormField
            label="Order notes"
            hideLabel
            name="order_note"
            id="order_note"
            type="text"
            elementType="textarea"
            value={formData.order_note.value}
            required={formData.order_note.validation.required}
            error={formData.order_note.error}
            onChange={setValue}
          />
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
