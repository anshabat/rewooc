import {PRODUCTS_LOAD_FAIL, PRODUCTS_LOAD_START, PRODUCTS_LOAD_SUCCESS} from "../actionTypes";

const initialState = {
  items: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  //console.log(action);
  //console.log(state);
  switch (action.type) {
    case PRODUCTS_LOAD_START:
      return {...state, loading: true};
    case PRODUCTS_LOAD_SUCCESS:
      return {...state, items: action.payload.products, loading: false};
    case PRODUCTS_LOAD_FAIL:
      return {...state, loading: false};
    default:
      return {...state};
  }
};
export default reducer