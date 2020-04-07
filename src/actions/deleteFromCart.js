import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';
import {ErrorMessage} from '../shared/errorMessages';

export const CART_DELETE_PRODUCT_START = "CART_DELETE_PRODUCT_START";
export const CART_DELETE_PRODUCT_SUCCESS = "CART_DELETE_PRODUCT_SUCCESS";
export const CART_DELETE_PRODUCT_FAIL = "CART_DELETE_PRODUCT_FAIL";

export const deleteFromCart = (productKey) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);

    dispatch({type: CART_DELETE_PRODUCT_START, payload: {productKey}});
    axios.post(ajaxEndpoint("rewooc_delete_from_cart"), data)
      .then(response => {
        if (response.data.success) {
          dispatch({type: CART_DELETE_PRODUCT_SUCCESS, payload: {productKey}});
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
        }
      })
      .catch(error => {
        dispatch({type: CART_DELETE_PRODUCT_FAIL, error});
      });
  }
};