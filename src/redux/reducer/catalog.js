import {CATALOG_PAGE_LOAD_FAIL, CATALOG_PAGE_LOAD_START, CATALOG_PAGE_LOAD_SUCCESS} from "../actionTypes";

const initialState = {
  title: '',
  loading: true,
  error: false,
  products: []
};

const reducer = (state = initialState, action) => {
  const {type, error, payload} = action;

  switch (type) {
    case CATALOG_PAGE_LOAD_START:
      return {...state, loading: true, error: false};
    case CATALOG_PAGE_LOAD_SUCCESS:
      return {...state, loading: false, error: false, products: payload.products, title: payload.title};
    case CATALOG_PAGE_LOAD_FAIL:
      return {...state, loading: false, error: error};
    default:
      return {...state};
  }
};
export default reducer