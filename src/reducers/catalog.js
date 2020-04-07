import {Record} from 'immutable';
import {CATALOG_PAGE_LOAD_FAIL, CATALOG_PAGE_LOAD_START, CATALOG_PAGE_LOAD_SUCCESS} from '../actions/loadCatalogPage';


const initialState = Record({
  title: '',
  loading: true,
  error: false,
  products: []
});

const reducer = (state = new initialState(), action) => {
  const {type, error, payload} = action;

  switch (type) {
    case CATALOG_PAGE_LOAD_START:
      return state.set('loading', true).set('error', false);
    case CATALOG_PAGE_LOAD_SUCCESS:
      return state
        .set('loading', false)
        .set('error', false)
        .set('products', payload.products)
        .set('title', payload.title);
    case CATALOG_PAGE_LOAD_FAIL:
      return state.set('loading', false).set('error', error);
    default:
      return state;
  }
};
export default reducer