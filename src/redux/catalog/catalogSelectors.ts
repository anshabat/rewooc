import { createSelector } from 'reselect'
import { AppStateType } from '../store'
import { IProduct } from 'app-types'
import { ICatalogState } from './catalogTypes'

export const selectProducts = (state: AppStateType): IProduct[] =>
  state.catalog.products

export const selectCatalogProcess = createSelector<
  AppStateType,
  ICatalogState,
  { loading: boolean; title: string; error: Error | boolean }
>(
  (state) => state.catalog,
  (result) => ({
    loading: result.loading,
    title: result.title,
    error: result.error,
  })
)
