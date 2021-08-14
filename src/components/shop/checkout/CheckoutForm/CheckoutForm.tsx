import React, { ChangeEvent, FC, FormEvent, FocusEvent, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Button from '../../../UI/Button/Button'
import { orderApi, IDeliveryMethod, authApi } from 'app-api'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../../../redux/cart/cartSelectors'
import FormField from '../../../UI/Form/FormField/FormField'
import Form from '../../../UI/Form/Form'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import { selectAccountUser } from '../../../../redux/account/accountSelector'
import { signIn } from '../../../../redux/auth/authActions'
import { clearCart } from '../../../../redux/cart/cartActions'
import PasswordField from '../../../UI/Form/PasswordField/PasswordField'
import { FormType, ValidationErrorType, validate } from 'app-services/form'
import { useCheckoutReducer } from '../../../../hooks/useCheckoutReducer'
import { ErrorMessage } from '../../../../shared/errorMessages'
import DeliveryMethods from '../DeliveryMethods/DeliveryMethods'
import PaymentMethods from '../PaymentMethods/PaymentMethods'
import CountryField from '../CountryField/CountryField'

interface IProps {
  onUpdateDelivery?: (deliveryMethod: IDeliveryMethod) => void
  onCreateOrder?: (orderData: FormType) => void
}

const CheckoutForm: FC<IProps> = (props) => {
  const { onUpdateDelivery } = props
  const cartItems = useSelector(selectCartItems)
  const [isOrderLoading, setOrderLoading] = useState(false)
  const {
    formData,
    clearForm,
    setField,
    toggleSignUp,
    toggleRecipient,
    chooseCountry,
  } = useCheckoutReducer()
  const [errors, setErrors] = useState<ValidationErrorType>({})
  const user = useSelector(selectAccountUser)
  const dispatch = useDispatch()
  const history = useHistory()

  const userId = user ? user.id : 0

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [hasErrors, formErrors] = validate(formData)
    setErrors(formErrors)
    if (hasErrors) {
      return
    }

    if (cartItems.length === 0) {
      alert('No items in the cart')
      return
    }

    setOrderLoading(true)

    try {
      let emailExists = false
      if (formData.sign_up.value) {
        emailExists = await authApi.checkEmail(formData.billing_email.value)
      }

      if (emailExists) {
        setErrors({ billing_email: ErrorMessage.EMAIL_ALREADY_EXISTS })
      } else {
        const orderData = await orderApi.createOrder(
          formData,
          cartItems,
          userId
        )
        if (orderData.user && !userId) {
          dispatch(
            signIn(
              formData.billing_email.value,
              formData.account_password.value
            )
          )
        }
        dispatch(clearCart())
        clearForm()
        history.push(`/my-account/view-order/${orderData.order}`)
      }
    } catch (error) {
      alert(error.message)
    }

    setOrderLoading(false)
  }

  const setValue = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setField(name, value)
  }

  const validateEmail = async (email: string, shouldCheck: boolean) => {
    let emailExists = false
    if (shouldCheck) {
      emailExists = await authApi.checkEmail(email)
    }
    if (emailExists) {
      setErrors({ billing_email: ErrorMessage.EMAIL_ALREADY_EXISTS })
    } else {
      setErrors({})
    }
  }

  console.log(formData)

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
            onBlur={(e: FocusEvent<HTMLInputElement>) => {
              validateEmail(e.target.value, formData.sign_up.value)
            }}
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
              onChange={(e: ChangeEvent<HTMLFormElement>) => {
                console.log(formData.billing_email.value)
                console.log(e.target.checked)
                toggleSignUp(e)
                validateEmail(formData.billing_email.value, e.target.checked)
              }}
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
          <CountryField
            formData={formData}
            error={errors.billing_country}
            onChange={chooseCountry}
          />
          {formData.billing_country.value ? (
            <DeliveryMethods
              formData={formData}
              error={errors.deliveryMethodId}
              onLoad={(deliveryMethods) => {
                console.log(deliveryMethods, 'lala')
                setField('deliveryMethodId', '')
              }}
              onChange={(deliveryMethod, e: ChangeEvent<HTMLInputElement>) => {
                setValue(e)
                if (typeof onUpdateDelivery === 'function') {
                  onUpdateDelivery(deliveryMethod)
                }
              }}
            />
          ) : (
            <p>Choose the country before delivery methods</p>
          )}
        </Form.Fields>
      </Form.Fieldset>

      <Form.Fieldset>
        <Form.Legend>Payment</Form.Legend>
        <Form.Fields>
          <PaymentMethods
            error={errors.payment}
            formData={formData}
            onChange={(paymentMethod, e: ChangeEvent<HTMLInputElement>) => {
              setValue(e)
            }}
          />
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
