import { instance } from '../instance'
import { wcAjax, wcRest } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'

async function createOrder(form: any, cartItems: ICartItem[]): Promise<void> {
  const products = cartItems.map((item) => {
    return {
      product_id: item.product?.id,
      quantity: item.quantity,
    }
  })

  const options = {
    status: 'processing',
    payment_method: form.elements['payment_method'].value,
    set_paid: false,
    customer_id: 1,
    billing: {
      first_name: form.elements['billing_first_name'].value,
      last_name: form.elements['billing_last_name'].value,
      country: form.elements['billing_country'].value,
      city: form.elements['billing_city'].value,
      address_1: form.elements['billing_address_1'].value,
      phone: form.elements['billing_phone'].value,
      email: form.elements['billing_email'].value,
    },
    line_items: products,
    shipping_lines: [
      {
        method_id: 'flat_rate',
        method_title: 'Укрпошта',
        total: '10.00',
      },
    ],
  }
  console.log(options)
  const response = await instance.post(wcRest('orders'), options)
}

async function fetchCheckoutPage(): Promise<any> {
  const response = await instance.get(wcAjax('rewooc_fetch_checkout_data'))
  return response
}

async function fetchDeliveryMethods(): Promise<any> {
  const response = await instance.get(wcRest('shipping/zones/1/methods'))
  return response
}

async function fetchPaymentMethods(): Promise<any> {
  const response = await instance.get(wcRest('payment_gateways'))
  return response
}

export default {
  createOrder,
  fetchCheckoutPage,
  fetchDeliveryMethods,
  fetchPaymentMethods,
}
