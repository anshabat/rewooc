import {createSelector} from 'reselect'

export const selectProducts = createSelector(
  state => state.catalog.products,
  products => products.toJS()
)