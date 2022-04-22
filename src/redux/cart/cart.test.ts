import { ICartItem } from 'api'
import store from 'redux/store'
import { products as productsMock } from 'test/productsMock'
import {
  addToCart,
  addToCartSuccess,
  setCartProductQuantitySuccess,
} from './cartActions'

describe('redux store integration test', () => {
  it('should set addingProductId in the process of adding product to cart', () => {
    store.dispatch(addToCart(1, 1))
    const { addingProductId } = store.getState().cart
    expect(addingProductId).toBe(1)
  })

  it('should add new product to cart or change quantiry', () => {
    const cartItem: ICartItem = {
      key: '1',
      quantity: 1,
      totalPrice: 100,
      product: productsMock[0],
    }

    store.dispatch(addToCartSuccess(cartItem))
    const { products, items } = store.getState().cart
    expect(products[0]).toEqual(productsMock[0])
    expect(products).toHaveLength(1)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      key: '1',
      quantity: 1,
      totalPrice: 100,
      productId: 1,
    })

    store.dispatch(setCartProductQuantitySuccess(cartItem))
    expect(products[0]).toEqual(productsMock[0])
    expect(products).toHaveLength(1)
    expect(items).toHaveLength(1)
    expect(items[0]).toEqual({
      key: '1',
      quantity: 1,
      totalPrice: 100,
      productId: 1,
    })
  })
})
