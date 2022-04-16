import { cartApi, ICartItem } from 'api'
import { call, put, select } from 'redux-saga/effects'
import { products } from 'test/productsMock'
import {
  addToCartFail,
  addToCartSuccess,
  CART_ADD_PRODUCT,
  CART_DELETE_PRODUCT,
  CART_DELETE_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  setCartProductQuantity,
} from './cartActions'
import { addToCartSaga, deleteFromCartSaga } from './cartSagas'
import { selectCartItems } from './cartSelectors'

describe('cartSagas', () => {
  describe('deleteFromCartSaga', () => {
    it('should succeed', () => {
      const productKey = '1'
      const saga = deleteFromCartSaga({
        type: CART_DELETE_PRODUCT,
        payload: { productKey },
      })
      const step1 = saga.next()
      expect(step1.done).toBe(false)
      expect(step1.value).toEqual(
        call(cartApi.deleteProductFromCart, productKey)
      )

      const step2 = saga.next()
      expect(step2.value).toEqual(
        put({
          type: CART_DELETE_PRODUCT_SUCCESS,
          payload: { productKey },
        })
      )
      expect(step2.done).toBe(false)

      const step3 = saga.next()
      expect(step3.done).toBe(true)
    })

    it('should fail', () => {
      const error = new Error()
      const productKey = '1'
      const generator = deleteFromCartSaga({
        type: CART_DELETE_PRODUCT,
        payload: { productKey },
      })
      generator.next()
      expect(generator.throw(error).value).toEqual(
        put({
          type: CART_DELETE_PRODUCT_FAIL,
          error,
        })
      )
    })
  })
})
