import produce from 'immer'
import { ICatalogState, CatalogActionTypes } from './catalogTypes'
import {
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_SUCCESS,
} from './catalogActions'

const initialState: ICatalogState = {
  title: '',
  loading: true,
  error: false,
  products: [],
}

const reducer = (
  state = initialState,
  action: CatalogActionTypes
): ICatalogState => {
  return produce(state, (draft) => {
    switch (action.type) {
      case CATALOG_PAGE_LOAD:
        draft.loading = true
        draft.error = false
        break
      case CATALOG_PAGE_LOAD_SUCCESS:
        draft.loading = false
        draft.error = false
        draft.products = action.payload.products
        draft.title = action.payload.title
        break
      case CATALOG_PAGE_LOAD_FAIL:
        console.error(action.error)
        draft.loading = false
        draft.error = action.error
    }
  })
}

export default reducer
