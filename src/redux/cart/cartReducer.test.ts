import { cartItems } from 'test/cartMocks'
import { products } from 'test/productsMock'
import {
  CART_ADD_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
} from './cartActions'
import cartReducer from './cartReducer'
import { CartActionTypes, ICartState } from './cartTypes'

describe('Cart reducer', () => {
  it('should add product into cart', () => {
    const state: ICartState = {
      title: '',
      loading: true,
      error: false,
      products: [],
      items: [],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    }
    const action: CartActionTypes = {
      type: CART_ADD_PRODUCT_SUCCESS,
      payload: { cartItem: cartItems[0] },
    }
    const newState = cartReducer(state, action)
    expect(newState).toEqual<ICartState>({
      title: '',
      loading: true,
      error: false,
      products: [products[0]],
      items: [{ quantity: 1, totalPrice: 100, key: '1', productId: 1 }],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    })
  })

  it('should change product quantity in the cart', () => {
    const state: ICartState = {
      title: '',
      loading: true,
      error: false,
      products: [products[0]],
      items: [{ quantity: 1, totalPrice: 100, key: '1', productId: 1 }],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    }
    const action: CartActionTypes = {
      type: CART_SET_PRODUCT_QUANTITY_SUCCESS,
      payload: {
        cartItem: {
          key: '1',
          quantity: 2,
          totalPrice: 200,
          product: products[0],
        },
      },
    }
    const newState = cartReducer(state, action)
    expect(newState).toEqual<ICartState>({
      title: '',
      loading: true,
      error: false,
      products: [products[0]],
      items: [{ quantity: 2, totalPrice: 200, key: '1', productId: 1 }],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    })
  })

  it('should delete product from cart', () => {
    const state: ICartState = {
      title: '',
      loading: true,
      error: false,
      products: [products[0], products[1]],
      items: [
        { quantity: 1, totalPrice: 100, key: '1', productId: 1 },
        { quantity: 3, totalPrice: 600, key: '2', productId: 2 },
      ],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    }
    const action: CartActionTypes = {
      type: CART_DELETE_PRODUCT_SUCCESS,
      payload: { productKey: '2' },
    }
    const newState = cartReducer(state, action)
    expect(newState).toEqual<ICartState>({
      title: '',
      loading: true,
      error: false,
      products: [products[0]],
      items: [{ quantity: 1, totalPrice: 100, key: '1', productId: 1 }],
      addingProductId: null,
      deletingProductKey: null,
      changingQuantityKey: null,
    })
  })
})
