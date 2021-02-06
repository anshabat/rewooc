import { IProduct } from 'app-types'
import { List, Map } from 'immutable'

export const CATALOG_PAGE_LOAD = 'CATALOG_PAGE_LOAD'
export const CATALOG_PAGE_LOAD_SUCCESS = 'CATALOG_PAGE_LOAD_SUCCESS'
export const CATALOG_PAGE_LOAD_FAIL = 'CATALOG_PAGE_LOAD_FAIL'

interface IImmutableProduct extends IProduct, Map<string, any> {}

export interface ICatalogState {
  title: string
  loading: boolean
  error: boolean
  products: List<IImmutableProduct>
}

export interface ICatalogPage {
  title: string
  products: Array<IProduct>
}

interface ILoadCatalogPageAction {
  type: typeof CATALOG_PAGE_LOAD
  payload: { url: string }
}

interface ILoadCatalogPageSuccessAction {
  type: typeof CATALOG_PAGE_LOAD_SUCCESS
  payload: ICatalogPage
}

interface ILoadCatalogPageFail {
  type: typeof CATALOG_PAGE_LOAD_FAIL
  error: Error
}

export type CatalogActionType =
  | ILoadCatalogPageAction
  | ILoadCatalogPageSuccessAction
  | ILoadCatalogPageFail
