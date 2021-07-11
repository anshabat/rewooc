import { createField, FormType } from 'app-services/form'
import { ChangeEvent, useState } from 'react'

type SetFieldType = (name: string, value: string | number | boolean) => void
type ToggleRecipientType = (e: ChangeEvent<HTMLFormElement>) => void
type ToggleSignUpType = (e: ChangeEvent<HTMLFormElement>) => void
type ClearFormType = () => void

interface IUseCheckoutForm {
  formData: FormType
  setField: SetFieldType
  toggleRecipient: ToggleRecipientType
  toggleSignUp: ToggleSignUpType
  clearForm: ClearFormType
}

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

export function useCheckoutFormState(): IUseCheckoutForm {
  const [formData, setFormData] = useState<FormType>(initialFormState)

  const clearForm: ClearFormType = () => {
    setFormData(initialFormState)
  }

  const setField: SetFieldType = (name, value) => {
    setFormData({
      ...formData,
      [name]: { ...formData[name], value },
    })
  }

  const toggleRecipient: ToggleRecipientType = (e) => {
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

  const toggleSignUp: ToggleSignUpType = (e) => {
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

  return {
    formData,
    setField,
    toggleRecipient,
    toggleSignUp,
    clearForm,
  }
}
