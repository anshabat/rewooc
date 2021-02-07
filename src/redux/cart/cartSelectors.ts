import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { ICartItem, ImmutableCartItemType } from './cartTypes'
import { List } from 'immutable'

export const selectCartData = createSelector(
  (state) => state.cart.items,
  (state) => state.cart.products,
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

export const selectCartTotalPrice = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.get('totalPrice'), 0)
)

export const selectCartTotalQuantity = createSelector(
  (state) => state.cart.items,
  (items) => items.reduce((total, item) => total + item.get('quantity'), 0)
)

export const addingProductToCart = (state, productId) =>
  state.cart.addingProductId === productId

export const isProductInCart = (state, productId) =>
  state.cart.items.some((item) => item.get('productId') === productId)
