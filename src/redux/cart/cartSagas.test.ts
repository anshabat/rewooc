import { cartApi, ICartItem } from 'api'
import { call, put, select } from 'redux-saga/effects'
import { getProductsMock } from 'test/productsMock'
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
  const products = getProductsMock()

  describe('addToCartSaga', () => {
    it('should add new product it is not in the cart', () => {
      const productId = 1
      const quantity = 1
      const currentCartItems: ICartItem[] = []
      const newCartItem = {
        key: '1',
        quantity: 1,
        totalPrice: 100,
        product: products[0],
      }
      const generator = addToCartSaga({
        type: CART_ADD_PRODUCT,
        payload: { productId, quantity },
      })

      const step1 = generator.next()
      expect(step1.value).toEqual(select(selectCartItems))

      const step2 = generator.next(currentCartItems as any)
      expect(step2.value).toEqual(call(cartApi.addToCart, productId, quantity))

      const step3 = generator.next(newCartItem as any)
      expect(step3.value).toEqual(put(addToCartSuccess(newCartItem)))
    })

    it('should increment quantity if product is already in the cart', () => {
      const productId = 1
      const quantity = 1
      const cartItems: ICartItem[] = [
        {
          key: '1',
          quantity: 1,
          totalPrice: 100,
          product: products[0],
        },
      ]
      const generator = addToCartSaga({
        type: CART_ADD_PRODUCT,
        payload: { productId, quantity },
      })

      const step1 = generator.next()
      expect(step1.value).toEqual(select(selectCartItems))

      const step2 = generator.next(cartItems as any)
      expect(step2.value).toEqual(put(setCartProductQuantity('1', 2)))
    })

    it('should throw an error if cartApi.addToCart fail', () => {
      const productId = 1
      const quantity = 1
      const error = new Error()
      const generator = addToCartSaga({
        type: CART_ADD_PRODUCT,
        payload: { productId, quantity },
      })

      const step1 = generator.next()
      expect(step1.value).toEqual(select(selectCartItems))

      const step2 = generator.next([] as any)
      expect(step2.value).toEqual(call(cartApi.addToCart, productId, quantity))

      generator.next()
      const errorStep = generator.throw(error)
      expect(errorStep.value).toEqual(put(addToCartFail(error)))
    })
  })
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
