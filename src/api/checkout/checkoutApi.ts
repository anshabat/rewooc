import { IDeliveryMethod, IPaymentMethod, IRegion } from 'app-api'
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
async function fetchDeliveryMethods(
  countryCode = ''
): Promise<IDeliveryMethod[]> {
  const {
    data: { data, success },
  } = await instance.get<
    IResponseData<{
      [key: number]: IDeliveryMethodResponse
    }>
  >(wcAjax('rewooc_fetch_delivery_methods'), {
    params: { country: countryCode },
  })

  if (!success) {
    throw new Error('Fail to fetch delivery methods')
  }

  const methods = Object.values(data).map<IDeliveryMethod>((method) => {
    return {
      id: method.instance_id,
      title: method.title,
      cost: Number(method.cost ?? 0),
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

/**
 * Fetch countries
 */
async function fetchCountries(): Promise<IRegion[]> {
  const {
    data: { success, data },
  } = await instance.get<IResponseData<{ [key: string]: string }>>(
    wcAjax('rewooc_fetch_countries')
  )

  if (!success || !data) {
    throw new Error('Fail to fetch countries')
  }

  return Object.entries(data).map(([code, name]) => [name, code])
}

export default {
  fetchDeliveryMethods,
  fetchPaymentMethods,
  fetchCountries,
}
