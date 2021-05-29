import { ICartItem, IDeliveryMethod, IPaymentMethod } from 'app-api'
import { instance } from '../instance'
import { IResponseData } from '../types'
import {
  IDeliveryMethodResponse,
  IPaymentMethodResponse,
} from './checkoutTypes'
import { wcAjax } from '../endpoints'

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
  fetchDeliveryMethods,
  fetchPaymentMethods,
}
