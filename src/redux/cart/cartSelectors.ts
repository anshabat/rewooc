import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { ICartData, ICartItem, ImmutableCartItemType } from './cartTypes'
import { List } from 'immutable'
import { ImmutableProductType } from 'app-types'

export const selectCartData = createSelector<
  AppStateType,
  List<ImmutableCartItemType>,
  List<ImmutableProductType>,
  Array<ICartData>
>(
  (state) => state.cart.get('items'),
  (state) => state.cart.get('products'),
  (items, products) =>
    items
      .map((item) => {
        const product = products.find(
          (p) => p.get('id') === item.get('productId')
        )
        return item.set('product', product)
      })
      .toJS()
)

export const selectCartItems = createSelector<
  AppStateType,
  List<ImmutableCartItemType>,
  Array<ICartItem>
>(
  (state) => state.cart.get('items'),
  (items) => {
    return items.toJS()
  }
)

export const selectCartTotalPrice = createSelector<
  AppStateType,
  List<ImmutableCartItemType>,
  number
>(
  (state) => state.cart.get('items'),
  (items) => {
    return items.reduce((total, item) => total + item.get('totalPrice'), 0)
  }
)

export const selectCartTotalQuantity = createSelector<
  AppStateType,
  List<ImmutableCartItemType>,
  number
>(
  (state) => state.cart.get('items'),
  (items) => {
    return items.reduce((total, item) => total + item.get('quantity'), 0)
  }
)

export const addingProductToCart = (
  state: AppStateType,
  productId: number
): boolean => {
  return state.cart.get('addingProductId') === productId
}

export const isProductInCart = (
  state: AppStateType,
  productId: number
): boolean => {
  return state.cart
    .get('items')
    .some((item) => item.get('productId') === productId)
}
