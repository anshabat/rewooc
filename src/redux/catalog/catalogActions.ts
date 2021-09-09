import { CatalogActionTypes, ICatalogPage } from './catalogTypes'

export const CATALOG_PAGE_LOAD = 'CATALOG_PAGE_LOAD'
export const CATALOG_PAGE_LOAD_SUCCESS = 'CATALOG_PAGE_LOAD_SUCCESS'
export const CATALOG_PAGE_LOAD_FAIL = 'CATALOG_PAGE_LOAD_FAIL'
export const CATALOG_PAGE_HIDE_ERROR = 'CATALOG_PAGE_HIDE_ERROR'

export const loadCatalogPage = (url: string): CatalogActionTypes => {
  return {
    type: CATALOG_PAGE_LOAD,
    payload: { url },
  }
}

export const loadCatalogPageSuccess = (
  data: ICatalogPage
): CatalogActionTypes => {
  return {
    type: CATALOG_PAGE_LOAD_SUCCESS,
    payload: {
      products: data.products,
      title: data.title,
    },
  }
}

export const loadCatalogPageFail = (error: Error): CatalogActionTypes => ({
  type: CATALOG_PAGE_LOAD_FAIL,
  error,
})

export const catalogPageHideError = (): CatalogActionTypes => ({
  type: CATALOG_PAGE_HIDE_ERROR,
})
