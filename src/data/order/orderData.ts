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
import { IOrderRequest } from 'app-data'
import { ICheckoutForm } from '../../components/shop/checkout/CheckoutForm/CheckoutForm'

/**
 * Submit new order
 */
async function createOrder(
  formData: ICheckoutForm,
  cartItems: ICartItem[]
): Promise<number> {
  const products = cartItems.map((item) => {
    return {
      product_id: item.product.id,
      quantity: item.quantity,
    }
  })

  const options: IOrderRequest = {
    billing: {
      first_name: formData.billing_first_name,
      last_name: formData.billing_last_name,
      phone: formData.billing_phone,
      email: formData.billing_email,
    },
    delivery: formData.delivery,
    payment: formData.payment,
    products: products,
    status: 'processing',
    customer_id: 1,
  }

  const {
    data: { success, data },
  } = await instance.post<IResponseData<number>>(
    wcAjax('rewooc_post_order'),
    options
  )

  if (!success) {
    throw new Error('Fail to create new Order')
  }

  return data
}

/**
 * Fetch delivery methods
 */
async function fetchDeliveryMethods(): Promise<IDeliveryMethod[]> {
  const {
    data: { data, success },
  } = await instance.get<
    IResponseData<{
      [key: number]: IDeliveryMethodResponse
    }>
  >(wcAjax('rewooc_fetch_delivery_methods'))

  if (!success) {
    throw new Error('Fail to fetch delivery methods')
  }

  const methods = Object.values(data).map<IDeliveryMethod>((method) => {
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

/**
 * Fetch payment methods
 */
async function fetchPaymentMethods(): Promise<IPaymentMethod[]> {
  const {
    data: { success, data },
  } = await instance.get<IResponseData<IPaymentMethodResponse[]>>(
    wcAjax('rewooc_fetch_payment_gateways')
  )

  if (!success) {
    throw new Error('Fail to fetch payment methods')
  }

  const methods = data.map<IPaymentMethod>((method) => {
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
