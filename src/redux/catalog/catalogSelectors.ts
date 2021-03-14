import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { List, Record } from 'immutable'
import { IProduct, ImmutableProductType } from 'app-types'
import { ICatalogState } from './catalogTypes'

export const selectProducts = createSelector<
  AppStateType,
  List<ImmutableProductType>,
  IProduct[]
>(
  (state) => state.catalog.get('products'),
  (products) => products.toJS()
)

export const selectCatalogProcess = createSelector<
  AppStateType,
  Record<ICatalogState>,
  { loading: boolean; title: string }
>(
  (state) => state.catalog,
  (result) => ({ loading: result.get('loading'), title: result.get('title') })
)
