import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';
import {ErrorMessage} from '../shared/errorMessages';
import {deleteFromCart} from './deleteFromCart';

export const CART_SET_PRODUCT_QUANTITY = "CART_SET_PRODUCT_QUANTITY";
export const CART_SET_PRODUCT_QUANTITY_START = "CART_SET_PRODUCT_QUANTITY_START";
export const CART_SET_PRODUCT_QUANTITY_SUCCESS = "CART_SET_PRODUCT_QUANTITY_SUCCESS";
export const CART_SET_PRODUCT_QUANTITY_FAIL = "CART_SET_PRODUCT_QUANTITY_FAIL";

export const setCartProductQuantity = (productKey, quantity) => {
  return dispatch => {

    if (parseInt(quantity) === 0) {
      dispatch(deleteFromCart(productKey));
      return;
    }

    const data = new FormData();
    data.set("productKey", productKey);
    data.set("quantity", quantity);

    dispatch(setCartProductQuantityStart(productKey));
    axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
      .then(response => {
        const {success, data} = response.data;
        if (success && data) {
          dispatch(setCartProductQuantitySuccess(data));
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
        }
      })
      .catch(error => {
        dispatch(setCartProductQuantityFail(error));
      });
  }
};

export const setCartProductQuantityStart = (productKey) => {
  return {type: CART_SET_PRODUCT_QUANTITY_START, payload: {productKey}};
};

export const setCartProductQuantitySuccess = (data) => {
  return {type: CART_SET_PRODUCT_QUANTITY_SUCCESS, payload: {cartItem: data}};
};

export const setCartProductQuantityFail = (error) => {
  return {type: CART_SET_PRODUCT_QUANTITY_FAIL, error};
};