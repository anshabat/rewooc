import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import { checkoutApi, orderApi, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Form from '../../../UI/Form/Form'
import ChoiceGroup from '../../../UI/Form/ChoiceGroup/ChoiceGroup'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import { selectAccountUser } from '../../../../redux/account/accountSelector'
import { signIn } from '../../../../redux/auth/authActions'
import { clearCart } from '../../../../redux/cart/cartActions'
import PasswordField from '../../../UI/Form/PasswordField/PasswordField'
import {
  createField,
  FormType,
  ValidationErrorType,
  validate,
} from 'app-services/form'

const initialFormState = {
  billing_first_name: createField('', { required: true }),
  billing_last_name: createField('', { required: true }),
  billing_phone: createField('', { required: true, phone: true }),
  billing_email: createField('', { email: true }),
  deliveryMethodId: createField('', { required: true }),
  payment: createField('', { required: true }),
  ship_to_different_address: createField(false),
  shipping_first_name: createField(''),
  shipping_last_name: createField(''),
  order_note: createField(''),
  sign_up: createField(false),
  account_password: createField('', { equal: 'account_password_repeat' }),
  account_password_repeat: createField(''),
}

interface IProps {
  onUpdateDelivery?: (deliveryMethod: IDeliveryMethod) => void
  onCreateOrder?: (orderData: FormType) => void
}

const CheckoutForm: FC<IProps> = (props) => {
  const { onUpdateDelivery } = props
  const cartItems = useSelector(selectCartItems)

  const [isOrderLoading, setOrderLoading] = useState(false)
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])
  const [formData, setFormData] = useState<FormType>(initialFormState)
  const [errors, setErrors] = useState<ValidationErrorType>({})
  const user = useSelector(selectAccountUser)
  const dispatch = useDispatch()
  const history = useHistory()
  const userId = user ? user.id : 0

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

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (cartItems.length === 0) {
      alert('No items in the cart')
      return
    }

    const [hasErrors, formErrors] = validate(formData)
    setErrors(formErrors)
    if (hasErrors) {
      return
    }

    setOrderLoading(true)
    return orderApi
      .createOrder(formData, cartItems, userId)
      .then((orderData) => {
        if (orderData.user && !userId) {
          dispatch(
            signIn(
              formData.billing_email.value,
              formData.account_password.value
            )
          )
        }
        dispatch(clearCart())
        setFormData(initialFormState)
        history.push(`/my-account/view-order/${orderData.order}`)
      })
      .catch((error: Error) => {
        alert(error.message)
      })
      .finally(() => {
        setOrderLoading(false)
      })
  }

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormType
    const value = e.target.value
    setFormData({
      ...formData,
      [name]: { ...formData[name], value },
    })
  }

  const toggleRecipient = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      ship_to_different_address: createField(e.target.checked),
      billing_last_name: createField(formData.billing_last_name.value, {
        ...formData.billing_last_name.validation,
        required: !e.target.checked,
      }),
      shipping_first_name: createField(formData.shipping_first_name.value, {
        ...formData.shipping_first_name.validation,
        required: e.target.checked,
      }),
      shipping_last_name: createField(formData.shipping_last_name.value, {
        ...formData.shipping_last_name.validation,
        required: e.target.checked,
      }),
    })
  }

  const toggleSignUp = (e: ChangeEvent<HTMLFormElement>) => {
    setFormData({
      ...formData,
      sign_up: createField(e.target.checked),
      billing_email: createField(formData.billing_email.value, {
        ...formData.billing_email.validation,
        required: e.target.checked,
      }),
      account_password: createField(formData.account_password.value, {
        ...formData.account_password.validation,
        required: e.target.checked,
      }),
      account_password_repeat: createField(
        formData.account_password_repeat.value,
        {
          ...formData.account_password_repeat.validation,
          required: e.target.checked,
        }
      ),
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
            error={errors.billing_first_name}
            onChange={setValue}
          />

          <FormField
            label="Last name"
            name="billing_last_name"
            id="billing_last_name"
            type="text"
            value={formData.billing_last_name.value}
            required={formData.billing_last_name.validation.required}
            error={errors.billing_last_name}
            onChange={setValue}
          />

          <FormField
            label="Phone"
            name="billing_phone"
            id="billing_phone"
            type="text"
            value={formData.billing_phone.value}
            required={formData.billing_phone.validation.required}
            error={errors.billing_phone}
            onChange={setValue}
          />

          <FormField
            label="Email"
            name="billing_email"
            id="billing_email"
            type="text"
            value={formData.billing_email.value}
            required={formData.billing_email.validation.required}
            error={errors.billing_email}
            onChange={setValue}
          />

          <ChoiceField
            label="Ship to another person"
            name="ship_to_different_address"
            type="checkbox"
            value={Number(formData.ship_to_different_address.value)}
            required={formData.ship_to_different_address.validation.required}
            onChange={toggleRecipient}
            checked={formData.ship_to_different_address.value}
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
                error={errors.shipping_first_name}
                onChange={setValue}
              />
              <FormField
                label="Last Name"
                name="shipping_last_name"
                id="shipping_last_name"
                type="text"
                value={formData.shipping_last_name.value}
                required={formData.shipping_last_name.validation.required}
                error={errors.shipping_last_name}
                onChange={setValue}
              />
            </>
          ) : null}

          {userId ? null : (
            <ChoiceField
              label="Sign Up user"
              name="sign_up"
              type="checkbox"
              value={Number(formData.sign_up.value)}
              onChange={toggleSignUp}
              checked={Boolean(formData.sign_up.value)}
            />
          )}

          {formData.sign_up.value ? (
            <>
              <PasswordField
                label="Password Name"
                name="account_password"
                id="account_password"
                type="password"
                value={formData.account_password.value}
                required={formData.account_password.validation.required}
                error={errors.account_password}
                onChange={setValue}
              />
              <PasswordField
                label="Repeat Password"
                name="account_password_repeat"
                id="account_password_repeat"
                type="password"
                value={formData.account_password_repeat.value}
                required={formData.account_password_repeat.validation.required}
                error={errors.account_password_repeat}
                onChange={setValue}
              />
            </>
          ) : null}
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Delivery</Form.Legend>
        <Form.Fields>
          <ChoiceGroup items={deliveryMethods} error={errors.deliveryMethodId}>
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
          <ChoiceGroup items={paymentMethods} error={errors.payment}>
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
