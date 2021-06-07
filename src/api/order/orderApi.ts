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

  const shipping = formData.ship_to_different_address
    ? {
        first_name: formData.shipping_first_name,
        last_name: formData.shipping_last_name,
      }
    : null

  const options: IOrderRequest = {
    billing: {
      first_name: formData.billing_first_name,
      last_name: formData.billing_last_name,
      phone: formData.billing_phone,
      email: formData.billing_email,
    },
    delivery: formData.deliveryMethodId,
    payment: formData.payment,
    products: products,
    status: 'processing',
    customer_id: 1,
    shipping,
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
