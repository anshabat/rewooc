import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { ICartState } from './cartTypes'
import { ICartItem } from 'app-data'
import { IProduct } from 'app-types'

export const selectCartData = createSelector<
  AppStateType,
  ICartItem[],
  IProduct[],
  ICartItem[]
>(
  (state) => state.cart.items,
  (state) => state.cart.products,
  (items, products) =>
    items.map((item) => {
      //log item
      const product = products.find((p) => p.id === item.productId)
      if (product) {
        item.product = product
      }
      return item
    })
)

export const selectCartItems = (state: AppStateType): ICartItem[] => {
  return state.cart.items
}

export const selectCartProcess = createSelector<
  AppStateType,
  ICartState,
  { loading: boolean; title: null | string }
>(
  (state) => state.cart,
  (result) => ({ loading: result.loading, title: result.title })
)

export const selectCartTotalPrice = createSelector<
  AppStateType,
  ICartItem[],
  number
>(
  (state) => state.cart.items,
  (items) => {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }
)

export const selectCartTotalQuantity = createSelector<
  AppStateType,
  ICartItem[],
  number
>(
  (state) => state.cart.items,
  (items) => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }
)

export const selectDeletingProductKey = (
  state: AppStateType
): string | null => {
  return state.cart.deletingProductKey
}
export const selectQuantityKey = (state: AppStateType): string | null => {
  return state.cart.changingQuantityKey
}

export const selectAddingToCartId = (state: AppStateType): number | null => {
  return state.cart.addingProductId
}
