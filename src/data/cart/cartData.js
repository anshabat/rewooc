import {instance} from "../instance";
import {wcAjax} from "app-data/endpoints";

export const fetchCartPage = (url) => {
  return instance.get(url)
}

export const addToCart = (productId, quantity) => {
  const params = new FormData();
  params.set("productId", productId);
  params.set("quantity", quantity);

  return instance.post(wcAjax('rewooc_add_to_cart'), params)
}

export const setProductQuantity = (productKey, quantity) => {
  const data = new FormData();
  data.set("productKey", productKey);
  data.set("quantity", quantity);

  return instance.post(wcAjax('rewooc_set_cat_product_quantity'), data)
}

export const deleteProductFromCart = (productKey) => {
  const data = new FormData();
  data.set("productKey", productKey);

  return instance.post(wcAjax('rewooc_delete_from_cart'), data)
}