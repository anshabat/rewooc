import { ICatalogState, CatalogActionTypes } from './catalogTypes'
import {
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_SUCCESS,
} from './catalogActions'

const InitialState: ICatalogState = {
  title: '',
  loading: true,
  error: false,
  products: [],
}

const reducer = (
  state = InitialState,
  action: CatalogActionTypes
): ICatalogState => {
  switch (action.type) {
    case CATALOG_PAGE_LOAD:
      return { ...state, loading: true, error: false }
    case CATALOG_PAGE_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        products: action.payload.products,
        title: action.payload.title,
      }
    case CATALOG_PAGE_LOAD_FAIL:
      return { ...state, loading: false, error: action.error }
    default:
      return state
  }
}
export default reducer
