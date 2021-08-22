import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'
import { IResponseData } from '../types'
import { IOrderRequest } from 'app-api'
import { CheckoutFormType } from '../../hooks/useCheckoutReducer'

/**
 * Create new order
 */
interface INewOrderResponse {
  order: number
  user: number
  error?: any
}

async function createOrder(
  formData: CheckoutFormType,
  cartItems: ICartItem[],
  userId: number
): Promise<INewOrderResponse> {
  const products = cartItems.map((item) => {
    return {
      product_id: item.product.id,
      quantity: item.quantity,
    }
  })

  const shipping = formData.ship_to_different_address.value
    ? {
        first_name: formData.shipping_first_name.value,
        last_name: formData.shipping_last_name.value,
      }
    : null

  const sign_up = formData.sign_up.value
    ? {
        account_password: formData.account_password.value,
      }
    : null

  const options: IOrderRequest = {
    billing: {
      first_name: formData.billing_first_name.value,
      last_name: formData.billing_last_name.value,
      phone: formData.billing_phone.value,
      email: formData.billing_email.value,
      country: formData.billing_country.value,
    },
    delivery: formData.deliveryMethodId.value,
    payment: formData.payment.value,
    order_note: formData.order_note.value,
    products: products,
    status: 'processing',
    customer_id: userId,
    shipping,
    sign_up,
  }

  const {
    data: { success, data },
  } = await instance.post<IResponseData<INewOrderResponse>>(
    wcAjax('rewooc_post_order'),
    options
  )

  if (data.error) {
    const { errors } = data.error
    Object.values<string[]>(errors).forEach((errs) => {
      errs.forEach((e) => {
        throw new Error(e)
      })
    })
  }

  if (!success || !data.order) {
    throw new Error('Fail to create new Order')
  }

  return data
}

export default {
  createOrder,
}
