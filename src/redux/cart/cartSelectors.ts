import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { ICartState, INormalizedCartItem } from './cartTypes'
import { ICartItem } from 'app-data'
import { denormalizeCartItem } from './cartRepository'

export const selectCartItems = createSelector<
  AppStateType,
  ICartState,
  ICartItem[]
>(
  (state) => state.cart,
  (cart) => {
    return cart.items.map((item) => denormalizeCartItem(item, cart.products))
  }
)

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
  INormalizedCartItem[],
  number
>(
  (state) => state.cart.items,
  (items) => {
    return items.reduce((total, item) => total + item.totalPrice, 0)
  }
)

export const selectCartTotalQuantity = createSelector<
  AppStateType,
  INormalizedCartItem[],
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
