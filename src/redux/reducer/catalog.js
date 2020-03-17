import {CATALOG_PAGE_LOAD_FAIL, CATALOG_PAGE_LOAD_START, CATALOG_PAGE_LOAD_SUCCESS} from "../actionTypes";

const initialState = {
  title: '',
  loading: true,
  products: []
};

const reducer = (state = initialState, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case CATALOG_PAGE_LOAD_START:
      return {...state, loading: true};
    case CATALOG_PAGE_LOAD_SUCCESS:
      return {...state, products: action.payload.products, title: action.payload.title, loading: false};
    case CATALOG_PAGE_LOAD_FAIL:
      return {...state, loading: false};
    default:
      return {...state};
  }
};
export default reducer