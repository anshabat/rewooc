import { CheckoutFormType } from 'hooks/useCheckoutReducer'

export const getCheckoutFormDataMock = (): CheckoutFormType => {
  return {
    billing_first_name: { value: 'John', validation: { required: true } },
    billing_last_name: { value: 'Doe', validation: { required: true } },
    billing_phone: {
      value: '11111',
      validation: { required: true, phone: true },
    },
    billing_email: { value: 'j@d.com', validation: { email: true } },
    billing_address: { value: 'Ukraine', validation: { required: false } },
    deliveryMethodId: { value: 'id_1', validation: { required: true } },
    payment: { value: 'id_1', validation: { required: true } },
    ship_to_different_address: { value: false, validation: {} },
    billing_country: { value: 'UA', validation: { required: true } },
    shipping_first_name: { value: '', validation: {} },
    shipping_last_name: { value: '', validation: {} },
    order_note: { value: 'notes text', validation: {} },
    sign_up: { value: false, validation: {} },
    account_password: {
      value: '',
      validation: { equal: 'account_password_repeat' },
    },
    account_password_repeat: { value: '', validation: {} },
  }
}
