import { instance } from '../instance'
import { wcAjax } from '../endpoints'

export default {
  fetchCartPage: (url) => {
    return instance.get(url)
  },
  addToCart: (productId, quantity) => {
    const params = new FormData()
    params.set('productId', productId)
    params.set('quantity', quantity)

    return instance.post(wcAjax('rewooc_add_to_cart'), params)
  },
  setProductQuantity: (productKey, quantity) => {
    const data = new FormData()
    data.set('productKey', productKey)
    data.set('quantity', quantity)

    return instance.post(wcAjax('rewooc_set_cat_product_quantity'), data)
  },
  deleteProductFromCart: (productKey) => {
    const data = new FormData()
    data.set('productKey', productKey)

    return instance.post(wcAjax('rewooc_delete_from_cart'), data)
  },
}
