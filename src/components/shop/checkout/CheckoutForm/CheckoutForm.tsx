import React, { ChangeEvent, FC, FocusEvent } from 'react'
import Button from '../../../UI/Button/Button'
import { IDeliveryMethod } from 'app-api'
import { useSelector } from 'react-redux'
import FormField from '../../../UI/Form/FormField/FormField'
import Form from '../../../UI/Form/Form'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import { selectAccountUserId } from '../../../../redux/account/accountSelector'
import PasswordField from '../../../UI/Form/PasswordField/PasswordField'
import {
  CheckoutFormType,
  useCheckoutReducer,
} from '../../../../hooks/useCheckoutReducer'
import DeliveryMethods from '../DeliveryMethods/DeliveryMethods'
import PaymentMethods from '../PaymentMethods/PaymentMethods'
import CountryField from '../CountryField/CountryField'
import { useCheckoutForm } from '../../../../hooks/useCheckoutForm'
import AddressAutocomplete from '../../../UI/AddressAutocomplete/AddressAutocomplete'

interface IProps {
  onUpdateDelivery?: (deliveryMethod: IDeliveryMethod) => void
  onCreateOrder?: (orderData: CheckoutFormType) => void
}

const CheckoutForm: FC<IProps> = (props) => {
  const { onUpdateDelivery } = props
  const {
    formData,
    clearForm,
    setField,
    toggleSignUp,
    toggleRecipient,
    loadDeliveryMethods,
  } = useCheckoutReducer()
  const userId = useSelector(selectAccountUserId)
  const { isOrderLoading, errors, validateEmail, submitForm } = useCheckoutForm(
    formData,
    () => {
      clearForm()
    }
  )

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = e.target.name as keyof CheckoutFormType
    const value = e.target.value
    setField(name, value)
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
            onChange={setValue}
          />
          {formData.billing_country.value ? (
            <DeliveryMethods
              formData={formData}
              error={errors.deliveryMethodId}
              onLoad={(deliveryMethods) => {
                loadDeliveryMethods(deliveryMethods.length)
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
        <AddressAutocomplete
          onSelect={(location) => {
            console.log(location)
          }}
        />
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
