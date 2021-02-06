import { IProduct } from 'app-types'
import { List } from 'immutable'

export const CATALOG_PAGE_LOAD = 'CATALOG_PAGE_LOAD'
export const CATALOG_PAGE_LOAD_SUCCESS = 'CATALOG_PAGE_LOAD_SUCCESS'
export const CATALOG_PAGE_LOAD_FAIL = 'CATALOG_PAGE_LOAD_FAIL'

export interface ICatalogState {
  title: string
  loading: boolean
  error: boolean | Error
  products: List<IProduct>
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

export type CatalogActionTypes =
  | ILoadCatalogPageAction
  | ILoadCatalogPageSuccessAction
  | ILoadCatalogPageFail
