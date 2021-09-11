import { IProduct } from 'app-types'
import {
  CATALOG_PAGE_HIDE_ERROR,
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD_SUCCESS
} from './catalogActions'

export interface ICatalogState {
  title: string
  loading: boolean
  error: boolean | Error
  products: IProduct[]
}

export interface ICatalogPage {
  title: string
  products: Array<IProduct>
}

export interface ILoadCatalogPageAction {
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

interface ICatalogPageHideError {
  type: typeof CATALOG_PAGE_HIDE_ERROR
}

export type CatalogActionTypes =
  | ILoadCatalogPageAction
  | ILoadCatalogPageSuccessAction
  | ILoadCatalogPageFail
  | ICatalogPageHideError
