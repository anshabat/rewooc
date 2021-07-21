import { createField, FormType } from 'app-services/form'
import { ChangeEvent, useReducer } from 'react'

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

interface ISetFieldAction {
  type: 'SET_FIELD'
  name: string
  value: string | number | boolean
}

interface IToggleRecipientAction {
  type: 'TOGGLE_RECIPIENT'
  checked: boolean
}

interface IToggleSignUpAction {
  type: 'TOGGLE_SIGN_UP'
  checked: boolean
}

interface IClearFormAction {
  type: 'CLEAR_FORM'
}

type ActionType =
  | ISetFieldAction
  | IToggleRecipientAction
  | IToggleSignUpAction
  | IClearFormAction

const initialFormState = {
  billing_first_name: createField('', { required: true }),
  billing_last_name: createField('', { required: true }),
  billing_phone: createField('', { required: true, phone: true }),
  billing_email: createField('', { email: true }),
  deliveryMethodId: createField('', { required: true }),
  payment: createField('', { required: true }),
  ship_to_different_address: createField(false),
  billing_country: createField('', { required: true }),
  shipping_first_name: createField(''),
  shipping_last_name: createField(''),
  order_note: createField(''),
  sign_up: createField(false),
  account_password: createField('', { equal: 'account_password_repeat' }),
  account_password_repeat: createField(''),
}

const formReducer = (state: FormType, action: ActionType) => {
  switch (action.type) {
    case 'SET_FIELD': {
      const { name, value } = action
      return {
        ...state,
        [name]: { ...state[name], value },
      }
    }
    case 'TOGGLE_RECIPIENT': {
      const { checked } = action
      return {
        ...state,
        ship_to_different_address: createField(checked),
        billing_last_name: createField(state.billing_last_name.value, {
          ...state.billing_last_name.validation,
          required: !checked,
        }),
        shipping_first_name: createField(state.shipping_first_name.value, {
          ...state.shipping_first_name.validation,
          required: checked,
        }),
        shipping_last_name: createField(state.shipping_last_name.value, {
          ...state.shipping_last_name.validation,
          required: checked,
        }),
      }
    }
    case 'TOGGLE_SIGN_UP': {
      const { checked } = action
      return {
        ...state,
        sign_up: createField(checked),
        billing_email: createField(state.billing_email.value, {
          ...state.billing_email.validation,
          required: checked,
        }),
        account_password: createField(state.account_password.value, {
          ...state.account_password.validation,
          required: checked,
        }),
        account_password_repeat: createField(
          state.account_password_repeat.value,
          {
            ...state.account_password_repeat.validation,
            required: checked,
          }
        ),
      }
    }
    case 'CLEAR_FORM': {
      return initialFormState
    }
    default:
      return state
  }
}

export function useCheckoutReducer(): IUseCheckoutForm {
  const [formData, dispatch] = useReducer(formReducer, initialFormState)

  const clearForm: ClearFormType = () => {
    dispatch({ type: 'CLEAR_FORM' })
  }

  const setField: SetFieldType = (name, value) => {
    dispatch({ type: 'SET_FIELD', name, value })
  }

  const toggleRecipient: ToggleRecipientType = (e) => {
    dispatch({ type: 'TOGGLE_RECIPIENT', checked: e.target.checked })
  }

  const toggleSignUp: ToggleSignUpType = (e) => {
    dispatch({ type: 'TOGGLE_SIGN_UP', checked: e.target.checked })
  }

  return {
    formData,
    setField,
    toggleRecipient,
    toggleSignUp,
    clearForm,
  }
}
