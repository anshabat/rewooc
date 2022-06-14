import { getProductsMock } from 'test/productsMock'
import {
  addToCart,
  addToCartFail,
  addToCartSuccess,
  CART_ADD_PRODUCT,
  CART_ADD_PRODUCT_FAIL,
  CART_ADD_PRODUCT_SUCCESS,
  CART_CLEAR,
  CART_DELETE_PRODUCT,
  CART_DELETE_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_PAGE_LOAD,
  CART_PAGE_LOAD_FAIL,
  CART_PAGE_LOAD_SUCCESS,
  CART_SET_PRODUCT_QUANTITY,
  CART_SET_PRODUCT_QUANTITY_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  clearCart,
  deleteFromCart,
  deleteFromCartFail,
  deleteFromCartSuccess,
  loadCartPage,
  loadCartPageFail,
  loadCartPageSuccess,
  setCartProductQuantity,
  setCartProductQuantityFail,
  setCartProductQuantityStart,
  setCartProductQuantitySuccess,
} from './cartActions'

describe('cartActions', () => {
  const products = getProductsMock()

  it('should create loadCartPage action', () => {
    const url = 'test'
    const action = { type: CART_PAGE_LOAD, payload: { url } }
    expect(loadCartPage(url)).toEqual(action)
  })

  it('should create loadCartPageSuccess action', () => {
    const data = { title: 'Test' }
    const action = {
      type: CART_PAGE_LOAD_SUCCESS,
      payload: { title: data.title },
    }
    expect(loadCartPageSuccess(data)).toEqual(action)
  })

  it('should create loadCartPageFail action', () => {
    const error = new Error()
    const action = {
      type: CART_PAGE_LOAD_FAIL,
      error,
    }
    expect(loadCartPageFail(error)).toEqual(action)
  })

  it('should create addToCart action', () => {
    const productId = 1
    const quantity = 2
    const action = {
      type: CART_ADD_PRODUCT,
      payload: { productId, quantity },
    }
    expect(addToCart(productId, quantity)).toEqual(action)
  })

  it('should create addToCartSuccess action', () => {
    const data = {
      key: '1',
      quantity: 1,
      totalPrice: 10,
      product: products[0],
    }
    const action = {
      type: CART_ADD_PRODUCT_SUCCESS,
      payload: { cartItem: data },
    }
    expect(addToCartSuccess(data)).toEqual(action)
  })

  it('should create addToCartFail action', () => {
    const error = new Error()
    const action = {
      type: CART_ADD_PRODUCT_FAIL,
      error,
    }
    expect(addToCartFail(error)).toEqual(action)
  })

  it('should create setCartProductQuantity action', () => {
    const productKey = '1'
    const quantity = 2
    const action = {
      type: CART_SET_PRODUCT_QUANTITY,
      payload: { productKey, quantity },
    }
    expect(setCartProductQuantity(productKey, quantity)).toEqual(action)
  })

  it('should create setCartProductQuantityStart action', () => {
    const productKey = '1'
    const action = {
      type: CART_SET_PRODUCT_QUANTITY_START,
      payload: { productKey },
    }
    expect(setCartProductQuantityStart(productKey)).toEqual(action)
  })

  it('should create setCartProductQuantitySuccess action', () => {
    const data = {
      key: '1',
      quantity: 1,
      totalPrice: 10,
      product: products[0],
    }
    const action = {
      type: CART_SET_PRODUCT_QUANTITY_SUCCESS,
      payload: { cartItem: data },
    }
    expect(setCartProductQuantitySuccess(data)).toEqual(action)
  })

  it('should create setCartProductQuantityFail action', () => {
    const error = new Error()
    const action = {
      type: CART_SET_PRODUCT_QUANTITY_FAIL,
      error,
    }
    expect(setCartProductQuantityFail(error)).toEqual(action)
  })

  it('should create deleteFromCart action', () => {
    const productKey = '1'
    const action = {
      type: CART_DELETE_PRODUCT,
      payload: { productKey },
    }
    expect(deleteFromCart(productKey)).toEqual(action)
  })

  it('should create deleteFromCartSuccess action', () => {
    const productKey = '1'
    const action = {
      type: CART_DELETE_PRODUCT_SUCCESS,
      payload: { productKey },
    }
    expect(deleteFromCartSuccess(productKey)).toEqual(action)
  })

  it('should create deleteFromCartFail action', () => {
    const error = new Error()
    const action = {
      type: CART_DELETE_PRODUCT_FAIL,
      error,
    }
    expect(deleteFromCartFail(error)).toEqual(action)
  })

  it('should create deleteFromCartFail action', () => {
    expect(clearCart()).toEqual({ type: CART_CLEAR })
  })
})
