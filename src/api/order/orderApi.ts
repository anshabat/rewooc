import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { ICartItem } from '../cart/cartTypes'
import { IResponseData } from '../types'
import { IOrderRequest } from 'app-api'
import { CheckoutFormType } from '../../components/shop/checkout/CheckoutForm/CheckoutForm'

/**
 * Create new order
 */
async function createOrder(
  formData: CheckoutFormType,
  cartItems: ICartItem[]
): Promise<number> {
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
        password: formData.password.value,
      }
    : null

  const options: IOrderRequest = {
    billing: {
      first_name: formData.billing_first_name.value,
      last_name: formData.billing_last_name.value,
      phone: formData.billing_phone.value,
      email: formData.billing_email.value,
    },
    delivery: formData.deliveryMethodId.value,
    payment: formData.payment.value,
    order_note: formData.order_note.value,
    products: products,
    status: 'processing',
    customer_id: 1,
    shipping,
    sign_up,
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

export default {
  createOrder,
}
