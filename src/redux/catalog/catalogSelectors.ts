import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { List } from 'immutable'
import { IProduct, ImmutableProductType } from 'app-types'

export const selectProducts = createSelector<
  AppStateType,
  List<ImmutableProductType>,
  IProduct[]
>(
  (state) => state.catalog.get('products'),
  (products) => products.toJS()
)
