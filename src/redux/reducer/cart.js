import {
    CART_ADD_PRODUCT_START,
    CART_ADD_PRODUCT_SUCCESS,
    CART_ADD_PRODUCT_FAIL
} from '../actionTypes';

export const initialState = (data) => {
  return {
      ...data,
      addingProductId: null
  }
};

export default function reducer (state = {}, action) {
    /*console.log(action);
    console.log(state);*/
    switch (action.type) {
        case CART_ADD_PRODUCT_START:
            return {...state, addingProductId: action.payload.productId};
        case CART_ADD_PRODUCT_SUCCESS:
            return {...state, ...action.payload.cart, addingProductId: null};
        case CART_ADD_PRODUCT_FAIL:
            return state;
        default:
            return state;
    }
};