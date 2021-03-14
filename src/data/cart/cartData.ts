import { instance } from '../instance'
import { wcAjax } from '../endpoints'
import { IAddToCart, ICartPage, IDeleteProductFromCart } from './cartTypes'
import { ErrorMessage } from '../../shared/errorMessages'
import { ICartItem } from './cartTypes'
import { cartItemFacade } from './cartHelpers'

async function fetchCartPage(url: string): Promise<ICartPage> {
  const response = await instance.get<ICartPage>(url)
  return response.data
}

async function addToCart(
  productId: number,
  quantity: number
): Promise<ICartItem> {
  const params = new FormData()
  params.set('productId', String(productId))
  params.set('quantity', String(quantity))
  const response = await instance.post<IAddToCart>(
    wcAjax('rewooc_add_to_cart'),
    params
  )
  const { success, data } = response.data
  if (!success || !data) {
    throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT)
  }

  return cartItemFacade(data)
}

async function setProductQuantity(
  productKey: string,
  quantity: number
): Promise<ICartItem> {
  const requestParams = new FormData()
  requestParams.set('productKey', productKey)
  requestParams.set('quantity', String(quantity))

  const response = await instance.post<IAddToCart>(
    wcAjax('rewooc_set_cat_product_quantity'),
    requestParams
  )
  const { success, data } = response.data

  if (!success || !data) {
    throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
  }

  return cartItemFacade(data)
}

async function deleteProductFromCart(productKey: string): Promise<boolean> {
  const data = new FormData()
  data.set('productKey', productKey)

  const response = await instance.post<IDeleteProductFromCart>(
    wcAjax('rewooc_delete_from_cart'),
    data
  )
  const { success } = response.data
  if (!success) {
    throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT)
  }

  return success
}

export default {
  fetchCartPage,
  addToCart,
  setProductQuantity,
  deleteProductFromCart,
}
