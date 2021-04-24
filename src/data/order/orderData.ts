import { instance } from '../instance'
import { wcAjax, wcRest } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'
import { IDeliveryMethod, IDeliveryMethodsResponse } from './orderTypes'

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

async function fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
  const response = await instance.get<IDeliveryMethodsResponse>(
    wcAjax('rewooc_fetch_delivery_methods')
  )
  if (!response?.data?.success) {
    throw new Error('fetch delivery methods error')
  }

  const delivery = response.data.data

  const methods = Object.values(delivery).map<IDeliveryMethod>((method) => {
    return {
      id: method.instance_id,
      title: method.title,
      cost: Number(method.cost),
      enabled: method.enabled,
      order: method.method_order,
    }
  })

  return methods
}

async function fetchPaymentMethods(): Promise<any> {
  const response = await instance.get(wcRest('payment_gateways'))
  return response
}

export default {
  createOrder,
  fetchDeliveryMethods,
  fetchPaymentMethods,
}
