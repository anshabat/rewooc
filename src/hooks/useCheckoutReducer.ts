import { createField, IFormField } from 'app-services/form'
import { ChangeEvent, useReducer } from 'react'

type SetFieldType = (
  name: keyof CheckoutFormType,
  value: string | number | boolean
) => void
type ToggleRecipientType = (e: ChangeEvent<HTMLFormElement>) => void
type ToggleSignUpType = (e: ChangeEvent<HTMLFormElement>) => void
type ClearFormType = () => void
type LoadDeliveryMethodsType = (length: number) => void

interface IUseCheckoutForm {
  formData: CheckoutFormType
  setField: SetFieldType
  toggleRecipient: ToggleRecipientType
  toggleSignUp: ToggleSignUpType
  clearForm: ClearFormType
  loadDeliveryMethods: LoadDeliveryMethodsType
}

interface ISetFieldAction {
  type: 'SET_FIELD'
  name: keyof CheckoutFormType
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

interface LoadDeliveryAction {
  type: 'LOAD_DELIVERY_METHODS'
  length: number
}

interface IClearFormAction {
  type: 'CLEAR_FORM'
}

type ActionType =
  | ISetFieldAction
  | IToggleRecipientAction
  | IToggleSignUpAction
  | IClearFormAction
  | LoadDeliveryAction

export type CheckoutFormType = {
  billing_first_name: IFormField<string>
  billing_last_name: IFormField<string>
  billing_phone: IFormField<string>
  billing_email: IFormField<string>
  deliveryMethodId: IFormField<string>
  payment: IFormField<string>
  ship_to_different_address: IFormField<boolean>
  billing_country: IFormField<string>
  shipping_first_name: IFormField<string>
  shipping_last_name: IFormField<string>
  order_note: IFormField<string>
  sign_up: IFormField<boolean>
  account_password: IFormField<string>
  account_password_repeat: IFormField<string>
}

const initialFormState: CheckoutFormType = {
  billing_first_name: createField('', { required: true }),
  billing_last_name: createField('', { required: true }),
  billing_phone: createField('', { required: true, phone: true }),
  billing_email: createField('', { email: true }),
  deliveryMethodId: createField(''),
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

const formReducer = (state: CheckoutFormType, action: ActionType) => {
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
    case 'LOAD_DELIVERY_METHODS': {
      const { length } = action
      return {
        ...state,
        deliveryMethodId: {
          ...state.deliveryMethodId,
          validation: {
            ...state.deliveryMethodId.validation,
            required: Boolean(length),
          },
        },
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

  const loadDeliveryMethods: LoadDeliveryMethodsType = (length) => {
    dispatch({ type: 'LOAD_DELIVERY_METHODS', length })
  }

  return {
    formData,
    setField,
    toggleRecipient,
    toggleSignUp,
    clearForm,
    loadDeliveryMethods,
  }
}
