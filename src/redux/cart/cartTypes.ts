import { List, Map, Record } from 'immutable'
import { ICartItem, ImmutableProductType, IProduct } from 'app-types'
import {
  CART_ADD_PRODUCT,
  CART_ADD_PRODUCT_FAIL,
  CART_ADD_PRODUCT_SUCCESS,
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
} from './cartActions'

export type ImmutableCartItemType = ICartItem & Map<string, any>

export interface ICartPage {
  title: string
}

export interface ICartData extends ICartItem {
  product: IProduct
}

export interface ICartState {
  title: null | string
  loading: boolean
  error: boolean | Error
  products: List<ImmutableProductType>
  items: List<ImmutableCartItemType>
  addingProductId: null | number
  deletingProductKey: null | string
  changingQuantityKey: null | string
}

export type ImmutableCartState = Record<ICartState>

export interface ILoadCartPageAction {
  type: typeof CART_PAGE_LOAD
  payload: { url: string }
}

interface ILoadCartPageSuccessAction {
  type: typeof CART_PAGE_LOAD_SUCCESS
  payload: ICartPage
}

interface ILoadCartPageFailAction {
  type: typeof CART_PAGE_LOAD_FAIL
  error: Error
}

export interface IAddToCartAction {
  type: typeof CART_ADD_PRODUCT
  payload: { productId: number; quantity: number }
}

interface IAddToCartSuccessAction {
  type: typeof CART_ADD_PRODUCT_SUCCESS
  payload: { cartItem: ICartItem }
}

interface IAddToCartFailAction {
  type: typeof CART_ADD_PRODUCT_FAIL
  error: Error
}

export interface ISetCartProductQuantityAction {
  type: typeof CART_SET_PRODUCT_QUANTITY
  payload: { productKey: string; quantity: number }
}

interface ISetCartProductQuantityStartAction {
  type: typeof CART_SET_PRODUCT_QUANTITY_START
  payload: { productKey: string }
}

interface ISetCartProductQuantitySuccessAction {
  type: typeof CART_SET_PRODUCT_QUANTITY_SUCCESS
  payload: { cartItem: ICartItem }
}

interface ISetCartProductQuantityFailAction {
  type: typeof CART_SET_PRODUCT_QUANTITY_FAIL
  error: Error
}

export interface IDeleteFromCartAction {
  type: typeof CART_DELETE_PRODUCT
  payload: { productKey: string }
}

interface IDeleteFromCartSuccessAction {
  type: typeof CART_DELETE_PRODUCT_SUCCESS
  payload: { productKey: string }
}

interface IDeleteFromCartFailAction {
  type: typeof CART_DELETE_PRODUCT_FAIL
  error: Error
}

export type CartActionTypes =
  | ILoadCartPageAction
  | ILoadCartPageSuccessAction
  | ILoadCartPageFailAction
  | IAddToCartAction
  | IAddToCartSuccessAction
  | IAddToCartFailAction
  | ISetCartProductQuantityAction
  | ISetCartProductQuantityStartAction
  | ISetCartProductQuantitySuccessAction
  | ISetCartProductQuantityFailAction
  | IDeleteFromCartAction
  | IDeleteFromCartSuccessAction
  | IDeleteFromCartFailAction
