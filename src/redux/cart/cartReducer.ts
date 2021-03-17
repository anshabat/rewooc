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
import { ICartItem } from 'app-data'
import { IProduct } from 'app-types'

const getCartProducts = (cartItems: ICartItem[]): IProduct[] => {
  return cartItems.reduce<IProduct[]>((products, item) => {
    const exist = products.find((p) => p.id === item.product.id)
    if (!exist) {
      return products.concat(item.product)
    }

    return products
  }, [])
}

const addItem = (state: ICartState, newItem: ICartItem): ICartItem[] => {
  return state.items.concat(newItem)
}

const addProduct = (state: ICartState, newItem: ICartItem): IProduct[] => {
  const newProduct = newItem.product
  const products = state.products
  const exist = products.find((product) => product.id === newItem.productId)
  if (!exist) {
    return products.concat(newProduct)
  }

  return products
}

const deleteItem = (state: ICartState, key: string): ICartItem[] => {
  return state.items.filter((item) => item.key !== key)
}

const deleteProduct = (state: ICartState, key: string): IProduct[] => {
  const products = state.products
  const itemToDelete = state.items.find((item) => item.key === key)

  if (!itemToDelete) {
    return products
  }

  const productId = itemToDelete.productId
  const cartItems = state.items.filter((item) => item.key !== key)
  const exist = cartItems.some((item) => item.productId === productId)

  if (exist) {
    return products
  }

  return products.filter((product) => product.id !== productId)
}

const changeQuantity = (state: ICartState, newItem: ICartItem): ICartItem[] => {
  const items = [...state.items]
  const itemIndex = items.findIndex((item) => item.key === newItem.key)
  items[itemIndex].quantity = newItem.quantity
  items[itemIndex].totalPrice = newItem.totalPrice

  return items
}

export const InitialState: ICartState = {
  title: null,
  loading: true,
  error: false,
  products: [],
  items: [],
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null,
}

export default function reducer(
  state = InitialState,
  action: CartActionTypes | AppActionTypes
): ICartState {
  switch (action.type) {
    case INIT_APP_SUCCESS: {
      const items = action.payload.cart
      const products = getCartProducts(items)
      return { ...state, items: items, products: products }
    }
    case CART_PAGE_LOAD:
      return { ...state, loading: true }
    case CART_PAGE_LOAD_SUCCESS:
      return { ...state, loading: false, title: action.payload.title }
    case CART_PAGE_LOAD_FAIL:
      return { ...state, loading: false, error: action.error }
    case CART_ADD_PRODUCT:
      return { ...state, addingProductId: action.payload.productId }
    case CART_ADD_PRODUCT_SUCCESS: {
      const cartItem = action.payload.cartItem
      const items = addItem(state, cartItem)
      console.log(items)
      const products = addProduct(state, cartItem)

      return {
        ...state,
        items: items,
        products: products,
        addingProductId: null,
      }
    }
    case CART_ADD_PRODUCT_FAIL:
      return { ...state, addingProductId: null, error: action.error }
    case CART_DELETE_PRODUCT:
      return { ...state, deletingProductKey: action.payload.productKey }
    case CART_DELETE_PRODUCT_SUCCESS: {
      const items = deleteItem(state, action.payload.productKey)
      const products = deleteProduct(state, action.payload.productKey)

      return {
        ...state,
        items: items,
        products: products,
        deletingProductKey: null,
      }
    }
    case CART_DELETE_PRODUCT_FAIL:
      return { ...state, deletingProductKey: null, error: action.error }
    case CART_SET_PRODUCT_QUANTITY_START: {
      const currentItem = state.items.find(
        (item) => item.key === action.payload.productKey
      )

      if (currentItem) {
        return {
          ...state,
          changingQuantityKey: action.payload.productKey,
          addingProductId: currentItem.productId,
        }
      } else {
        return state
      }
    }
    case CART_SET_PRODUCT_QUANTITY_SUCCESS: {
      const items = changeQuantity(state, action.payload.cartItem)

      return {
        ...state,
        items: items,
        changingQuantityKey: null,
        addingProductId: null,
      }
    }
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return { ...state, changingQuantityKey: null, error: action.error }
    default:
      return state
  }
}
