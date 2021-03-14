import { fromJS, List, Record } from 'immutable'
import { INIT_APP_SUCCESS } from '../app/appActions'
import {
  ICartState,
  CartActionTypes,
  ImmutableCartItemType,
  ImmutableCartState,
} from './cartTypes'
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
import { ImmutableProductType } from 'app-types'

const getCartProducts = (
  cartItems: ImmutableCartItemType[]
): List<ImmutableProductType> => {
  return cartItems.reduce<List<ImmutableProductType>>((products, item) => {
    const exist = products.find(
      (p) => p.get('id') === item.getIn(['product', 'id'])
    )
    if (!exist) {
      return products.push(item.get('product'))
    }

    return products
  }, List([]))
}

const addItem = (
  state: ImmutableCartState,
  newItem: ImmutableCartItemType
): List<ImmutableCartItemType> => {
  return state.get('items').push(newItem)
}

const addProduct = (
  state: ImmutableCartState,
  newItem: ImmutableCartItemType
): List<ImmutableProductType> => {
  const newProduct = newItem.get('product')
  const products = state.get('products')
  const exist = products.find(
    (product) => product.get('id') === newItem.get('productId')
  )
  if (!exist) {
    return products.push(newProduct)
  }

  return products
}

const deleteItem = (
  state: ImmutableCartState,
  key: string
): List<ImmutableCartItemType> => {
  return state.get('items').filter((item) => item.get('key') !== key)
}

const deleteProduct = (
  state: ImmutableCartState,
  key: string
): List<ImmutableProductType> => {
  const products = state.get('products')
  const itemToDelete = state
    .get('items')
    .find((item) => item.get('key') === key)

  if (!itemToDelete) {
    return products
  }

  const productId = itemToDelete.get('productId')
  const cartItems = state.get('items').filter((item) => item.get('key') !== key)
  const exist = cartItems.some((item) => item.get('productId') === productId)

  if (exist) {
    return products
  }

  return products.filter((product) => product.get('id') !== productId)
}

const changeQuantity = (
  state: ImmutableCartState,
  newItem: ImmutableCartItemType
): List<ImmutableCartItemType> => {
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
      const items = cart.toList()
      const products = getCartProducts(items)
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
      const cartItem: ImmutableCartItemType = fromJS(action.payload.cartItem)
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
