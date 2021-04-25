import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'
import {
  IDeliveryMethod,
  IDeliveryMethodResponse,
  IPaymentMethod,
  IPaymentMethodResponse,
} from './orderTypes'
import { IResponseData } from '../types'

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
    shipping_zone: 1,
    shipping_method: 1,
  }
  // console.log(options)
  const response = await instance.post(wcAjax('rewooc_post_order'), options)
}

async function fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
  const response = await instance.get<
    IResponseData<{
      [key: number]: IDeliveryMethodResponse
    }>
  >(wcAjax('rewooc_fetch_delivery_methods'))
  if (!response?.data?.success) {
    throw new Error('Fail to fetch delivery methods')
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

async function fetchPaymentMethods(): Promise<IPaymentMethod[]> {
  const { data } = await instance.get<IResponseData<IPaymentMethodResponse[]>>(
    wcAjax('rewooc_fetch_payment_gateways')
  )

  if (!data?.success) {
    throw new Error('Fail to fetch payment methods')
  }

  const methods = data.data.map<IPaymentMethod>((method) => {
    return {
      id: method.id,
      title: method.title,
      description: method.description,
      order: method.order,
      enabled: method.enabled,
    }
  })

  return methods
}

export default {
  createOrder,
  fetchDeliveryMethods,
  fetchPaymentMethods,
}
