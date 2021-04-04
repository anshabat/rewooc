import { instance } from '../instance'
import { wcAjax, wcRest } from '../endpoints'

async function createOrder(formData: any): Promise<void> {
  const response = await instance.post(wcAjax('update_order_review'), formData)
  console.log(response)
}

async function fetchCheckoutPage(): Promise<any> {
  const response = await instance.get(wcAjax('rewooc_fetch_checkout_data'))
  return response
}

async function wooRest(): Promise<any> {
  const response = await instance.get(wcRest('shipping/zones/0/methods'))
  return response
}

export default {
  createOrder,
  fetchCheckoutPage,
  wooRest,
}
