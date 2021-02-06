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

export const loadCartPage = (url) => ({
  type: CART_PAGE_LOAD,
  payload: { url },
})

export const loadCartPageSuccess = (data) => ({
  type: CART_PAGE_LOAD_SUCCESS,
  payload: { title: data.title },
})

export const loadCartPageFail = (error) => ({
  type: CART_PAGE_LOAD_FAIL,
  error,
})

export const addToCart = (productId, quantity) => ({
  type: CART_ADD_PRODUCT,
  payload: { productId, quantity },
})

export const addToCartSuccess = (data) => ({
  type: CART_ADD_PRODUCT_SUCCESS,
  payload: { cartItem: data },
})

export const addToCartFail = (error) => ({ type: CART_ADD_PRODUCT_FAIL, error })

export const setCartProductQuantity = (productKey, quantity) => ({
  type: CART_SET_PRODUCT_QUANTITY,
  payload: { productKey, quantity },
})

export const setCartProductQuantityStart = (productKey) => ({
  type: CART_SET_PRODUCT_QUANTITY_START,
  payload: { productKey },
})

export const setCartProductQuantitySuccess = (data) => ({
  type: CART_SET_PRODUCT_QUANTITY_SUCCESS,
  payload: { cartItem: data },
})

export const setCartProductQuantityFail = (error) => ({
  type: CART_SET_PRODUCT_QUANTITY_FAIL,
  error,
})

export const deleteFromCart = (productKey) => ({
  type: CART_DELETE_PRODUCT,
  payload: { productKey },
})

export const deleteFromCartSuccess = (productKey) => ({
  type: CART_DELETE_PRODUCT_SUCCESS,
  payload: { productKey },
})

export const deleteFromCartFail = (error) => ({
  type: CART_DELETE_PRODUCT_FAIL,
  error,
})
