import { fromJS, List, Record, Map } from 'immutable'
import { INIT_APP_SUCCESS } from '../app/appActions'
import { ICartState, CartActionTypes } from './cartTypes'
import {
  CART_ADD_PRODUCT,
  CART_ADD_PRODUCT_FAIL,
  CART_ADD_PRODUCT_SUCCESS,
  CART_PAGE_LOAD,
  CART_PAGE_LOAD_FAIL,
  CART_PAGE_LOAD_SUCCESS,
  CART_DELETE_PRODUCT,
  CART_DELETE_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
} from './cartActions'
import { AppActionTypes } from '../app/appTypes'

const cartItemAdapter = (item) => {
  return Map({
    key: item.get('key'),
    productId: item.get('product_id'),
    quantity: item.get('quantity'),
    totalPrice: item.get('line_total'),
  })
}

const getCartItems = (state, cart) => {
  return cart.toList().map((item) => cartItemAdapter(item))
}

const getCartProducts = (state, cartItems) => {
  return cartItems.toList().reduce((products, item) => {
    const exist = products.find((p) => p.get('id') === item.get(['data', 'id']))
    if (!exist) {
      return products.push(item.get('data'))
    }

    return products
  }, List([]))
}

const addItem = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem)

  return state.items.push(newItem)
}

const addProduct = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem)
  const newProduct = serverItem.get('data')
  const products = state.get('products')
  const exist = products.find(
    (product) => product.get('id') === newItem.get('productId')
  )
  if (!exist) {
    return products.push(newProduct)
  }

  return products
}

const deleteItem = (state, key) => {
  return state.items.filter((item) => item.get('key') !== key)
}

const deleteProduct = (state, key) => {
  const productId = state.items
    .find((item) => item.get('key') === key)
    .get('productId')
  const cartItems = state.items.filter((item) => item.get('key') !== key)
  const exist = cartItems.some(
    (cartItem) => cartItem.get('productId') === productId
  )

  let items
  if (!exist) {
    items = state.products.filter((product) => product.get('id') !== productId)
  } else {
    items = state.products
  }

  return items
}

const changeQuantity = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem)
  const items = state.get('items')
  const itemIndex = items.findIndex(
    (item) => item.get('key') === newItem.get('key')
  )

  return items
    .setIn([itemIndex, 'quantity'], newItem.get('quantity'))
    .setIn([itemIndex, 'totalPrice'], newItem.get('totalPrice'))
}

export const InitialState = Record<ICartState>({
  title: null,
  loading: true,
  error: false,
  products: List([]),
  items: List([]),
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null,
})

export default function reducer(
  state = new InitialState(),
  action: CartActionTypes | AppActionTypes
): ICartState {
  switch (action.type) {
    case INIT_APP_SUCCESS: {
      const cart = fromJS(action.payload.cart)
      const items = getCartItems(state, cart)
      const products = getCartProducts(state, cart)
      return state.set('items', items).set('products', products)
    }
    case CART_PAGE_LOAD:
      return state.set('loading', true)
    case CART_PAGE_LOAD_SUCCESS:
      return state.set('loading', false).set('title', action.payload.title)
    case CART_PAGE_LOAD_FAIL:
      return state.set('loading', false).set('error', action.error)
    case CART_ADD_PRODUCT:
      return state.set('addingProductId', action.payload.productId)
    case CART_ADD_PRODUCT_SUCCESS: {
      const cartItem = fromJS(action.payload.cartItem)
      const items = addItem(state, cartItem)
      const products = addProduct(state, cartItem)
      return state
        .set('items', items)
        .set('products', products)
        .set('addingProductId', null)
    }
    case CART_ADD_PRODUCT_FAIL:
      return state.set('addingProductId', null).set('error', action.error)
    case CART_DELETE_PRODUCT:
      return state.set('deletingProductKey', action.payload.productKey)
    case CART_DELETE_PRODUCT_SUCCESS: {
      const items = deleteItem(state, action.payload.productKey)
      const products = deleteProduct(state, action.payload.productKey)
      return state
        .set('items', items)
        .set('products', products)
        .set('deletingProductKey', null)
    }
    case CART_DELETE_PRODUCT_FAIL:
      return state.set('deletingProductKey', null).set('error', action.error)
    case CART_SET_PRODUCT_QUANTITY_START: {
      const currentItem = state.items.find(
        (item) => item.get('key') === action.payload.productKey
      )
      return currentItem
        ? state
            .set('changingQuantityKey', action.payload.productKey)
            .set('addingProductId', currentItem.get('productId'))
        : state
    }
    case CART_SET_PRODUCT_QUANTITY_SUCCESS: {
      const items = changeQuantity(state, fromJS(action.payload.cartItem))
      return state
        .set('items', items)
        .set('changingQuantityKey', null)
        .set('addingProductId', null)
    }
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return state.set('changingQuantityKey', null).set('error', action.error)
    default:
      return state
  }
}