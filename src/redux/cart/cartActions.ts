import { CartActionTypes } from './cartTypes'
import { ICartItem, ICartPage } from "app-data";

export const CART_PAGE_LOAD = 'CART_PAGE_LOAD'
export const CART_PAGE_LOAD_SUCCESS = 'CART_LOAD_SUCCESS'
export const CART_PAGE_LOAD_FAIL = 'CART_LOAD_FAIL'

export const CART_ADD_PRODUCT = 'CART_ADD_PRODUCT'
export const CART_ADD_PRODUCT_SUCCESS = 'CART_ADD_PRODUCT_SUCCESS'
export const CART_ADD_PRODUCT_FAIL = 'CART_ADD_PRODUCT_FAIL'

export const CART_DELETE_PRODUCT = 'CART_DELETE_PRODUCT'
export const CART_DELETE_PRODUCT_SUCCESS = 'CART_DELETE_PRODUCT_SUCCESS'
export const CART_DELETE_PRODUCT_FAIL = 'CART_DELETE_PRODUCT_FAIL'

export const CART_SET_PRODUCT_QUANTITY = 'CART_SET_PRODUCT_QUANTITY'
export const CART_SET_PRODUCT_QUANTITY_START = 'CART_SET_PRODUCT_QUANTITY_START'
export const CART_SET_PRODUCT_QUANTITY_SUCCESS =
  'CART_SET_PRODUCT_QUANTITY_SUCCESS'
export const CART_SET_PRODUCT_QUANTITY_FAIL = 'CART_SET_PRODUCT_QUANTITY_FAIL'

export const loadCartPage = (url: string): CartActionTypes => {
  return {
    type: CART_PAGE_LOAD,
    payload: { url },
  }
}

export const loadCartPageSuccess = (data: ICartPage): CartActionTypes => {
  return {
    type: CART_PAGE_LOAD_SUCCESS,
    payload: { title: data.title },
  }
}

export const loadCartPageFail = (error: Error): CartActionTypes => {
  return {
    type: CART_PAGE_LOAD_FAIL,
    error,
  }
}

export const addToCart = (
  productId: number,
  quantity: number
): CartActionTypes => ({
  type: CART_ADD_PRODUCT,
  payload: { productId, quantity },
})

export const addToCartSuccess = (data: ICartItem): CartActionTypes => {
  return {
    type: CART_ADD_PRODUCT_SUCCESS,
    payload: { cartItem: data },
  }
}

export const addToCartFail = (error: Error): CartActionTypes => {
  return {
    type: CART_ADD_PRODUCT_FAIL,
    error,
  }
}

export const setCartProductQuantity = (
  productKey: string,
  quantity: number
): CartActionTypes => {
  return {
    type: CART_SET_PRODUCT_QUANTITY,
    payload: { productKey, quantity },
  }
}

export const setCartProductQuantityStart = (
  productKey: string
): CartActionTypes => {
  return {
    type: CART_SET_PRODUCT_QUANTITY_START,
    payload: { productKey },
  }
}

export const setCartProductQuantitySuccess = (
  data: ICartItem
): CartActionTypes => {
  return {
    type: CART_SET_PRODUCT_QUANTITY_SUCCESS,
    payload: { cartItem: data },
  }
}

export const setCartProductQuantityFail = (error: Error): CartActionTypes => {
  return {
    type: CART_SET_PRODUCT_QUANTITY_FAIL,
    error,
  }
}

export const deleteFromCart = (productKey: string): CartActionTypes => {
  return {
    type: CART_DELETE_PRODUCT,
    payload: { productKey },
  }
}

export const deleteFromCartSuccess = (productKey: string): CartActionTypes => {
  return {
    type: CART_DELETE_PRODUCT_SUCCESS,
    payload: { productKey },
  }
}

export const deleteFromCartFail = (error: Error): CartActionTypes => {
  return {
    type: CART_DELETE_PRODUCT_FAIL,
    error,
  }
}
