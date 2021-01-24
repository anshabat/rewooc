import { Record, List } from 'immutable'
import {
  CATALOG_PAGE_LOAD_FAIL,
  CATALOG_PAGE_LOAD,
  CATALOG_PAGE_LOAD_SUCCESS,
} from './catalogActions'

const InitialState = Record({
  title: '',
  loading: true,
  error: false,
  products: List([]),
})

const reducer = (state = new InitialState(), action) => {
  const { type, error, payload } = action

  switch (type) {
    case CATALOG_PAGE_LOAD:
      return state.set('loading', true).set('error', false)
    case CATALOG_PAGE_LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('products', List(payload.products))
        .set('title', payload.title)
    case CATALOG_PAGE_LOAD_FAIL:
      return state.set('loading', false).set('error', error)
    default:
      return state
  }
}
export default reducer
