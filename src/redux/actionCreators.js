import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL
} from "./actionTypes";
import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";

export const addToCart = (productId, quantity) => {
  return dispatch => {
    dispatch(addToCartStart(productId));

    const params = new FormData();
    params.set("productId", productId);
    params.set("quantity", quantity);

    axios.post(ajaxEndpoint("rewooc_add_to_cart"), params).then(response => {
      if (response.data.success && response.data.data) {
        dispatch(addToCartSuccess(response.data.data));
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
      }
    }).catch(error => {
      dispatch(addToCartFail(error));
    });
  }
};

export const addToCartStart = (productId) => {
  return {type: CART_ADD_PRODUCT_START, payload: {productId}}
};

export const addToCartSuccess = (product) => {
  return {type: CART_ADD_PRODUCT_SUCCESS, payload: {product}}
};

export const addToCartFail = (error) => {
  return {type: CART_ADD_PRODUCT_FAIL, error}
};

export const deleteFromCart = (productKey) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);

    dispatch(deleteFromCartStart(productKey));
    axios.post(ajaxEndpoint("rewooc_delete_from_cart"), data)
      .then(response => {
        if (response.data.success) {
          dispatch(deleteFromCartSuccess(productKey));
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
        }
      })
      .catch(error => {
        dispatch(deleteFromCartFail(error));
      });
  }
};

export const deleteFromCartStart = (productKey) => {
  return {type: CART_DELETE_PRODUCT_START, payload: {productKey}}
};

export const deleteFromCartSuccess = (productKey) => {
  return {type: CART_DELETE_PRODUCT_SUCCESS, payload: {productKey}}
};

export const deleteFromCartFail = (error) => {
  return {type: CART_DELETE_PRODUCT_FAIL, error}
};

export const setCartProductQuantity = (productKey, quantity) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);
    data.set("quantity", quantity);

    dispatch(setCartProductQuantityStart(productKey));
    axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
      .then(response => {
        if (response.data.success) {
          dispatch(setCartProductQuantitySuccess(productKey, response.data.data.quantity));
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
  return {type: CART_SET_PRODUCT_QUANTITY_START, payload: {productKey}}
};

export const setCartProductQuantitySuccess = (productKey, quantity) => {
  return {type: CART_SET_PRODUCT_QUANTITY_SUCCESS, payload: {productKey, quantity}}
};

export const setCartProductQuantityFail = (error) => {
  return {type: CART_SET_PRODUCT_QUANTITY_FAIL, error}
};