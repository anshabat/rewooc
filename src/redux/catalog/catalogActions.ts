import {
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD_SUCCESS,
  CatalogActionTypes,
  ICatalogPage,
} from './catalogTypes'

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
