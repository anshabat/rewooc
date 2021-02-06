import {
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD_SUCCESS,
  CatalogActionType,
  ICatalogPage,
} from './catalogTypes'

export const loadCatalogPage = (url: string): CatalogActionType => {
  return {
    type: CATALOG_PAGE_LOAD,
    payload: { url },
  }
}

export const loadCatalogPageSuccess = (
  data: ICatalogPage
): CatalogActionType => {
  return {
    type: CATALOG_PAGE_LOAD_SUCCESS,
    payload: {
      products: data.products,
      title: data.title,
    },
  }
}

export const loadCatalogPageFail = (error: Error): CatalogActionType => ({
  type: CATALOG_PAGE_LOAD_FAIL,
  error,
})
