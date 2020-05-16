import axios from 'axios';
import {ajaxEndpoint} from '../shared/utilities';
import {ErrorMessage} from '../shared/errorMessages';
import {setCartProductQuantity} from './setCartProductQuantity';

export const CART_ADD_PRODUCT_START = "CART_ADD_PRODUCT_START";
export const CART_ADD_PRODUCT_SUCCESS = "CART_ADD_PRODUCT_SUCCESS";
export const CART_ADD_PRODUCT_FAIL = "CART_ADD_PRODUCT_FAIL";

export const addToCart = (productId, quantity) => {
  return (dispatch, getState) => {

    const itemInCart = getState().cart.items.find(item => item.productId === productId);
    if (itemInCart) {
      const totalQuantity = parseInt(quantity) + parseInt(itemInCart.quantity);
      dispatch(setCartProductQuantity(itemInCart.key, totalQuantity));
      return;
    }

    dispatch(addToCartStart(productId));

    const params = new FormData();
    params.set("productId", productId);
    params.set("quantity", quantity);

    axios.post(ajaxEndpoint("rewooc_add_to_cart"), params).then(response => {
      const {success, data} = response.data;
      if (success && data) {
        dispatch(addToCartSuccess(data));
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
      }
    }).catch(error => {
      dispatch(addToCartFail(error));
    });
  }
};

export const addToCartStart = (productId) => {
  return {type: CART_ADD_PRODUCT_START, payload: {productId}};
};

export const addToCartSuccess = (data) => {
  return {type: CART_ADD_PRODUCT_SUCCESS, payload: {cartItem: data}};
};

export const addToCartFail = (error) => {
  return {type: CART_ADD_PRODUCT_FAIL, error};
};