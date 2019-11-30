import axios from "axios";
import {CART_ADD_PRODUCT, CART_DELETE_PRODUCT, CART_SET_PRODUCT_QUANTITY} from "./actionTypes";
import {
  addToCartSuccess,
  addToCartStart,
  addToCartFail,
  deleteFromCartStart,
  deleteFromCartSuccess,
  deleteFromCartFail,
  setCartProductQuantityStart,
  setCartProductQuantitySuccess,
  setCartProductQuantityFail
} from "./actionCreators";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";

export const addToCartMiddleware = store => next => action => {
  if (action.type !== CART_ADD_PRODUCT) {
    next(action);
    return;
  }
  next(addToCartStart(action.payload.productId));
  axios.get(ajaxEndpoint("rewooc_add_to_cart"), {
    params: {productId: action.payload.productId}
  }).then(response => {
    if (response.data.success && response.data.data) {
      next(addToCartSuccess(response.data.data));
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
    }
  }).catch(error => {
    next(addToCartFail(error));
  });
};

export const deleteFromCartMiddleware = store => next => action => {
  if (action.type !== CART_DELETE_PRODUCT) {
    next(action);
    return;
  }
  const productKey = action.payload.productKey;

  const data = new FormData();
  data.set("productKey", productKey);

  next(deleteFromCartStart(productKey));
  axios.post(ajaxEndpoint("rewooc_delete_from_cart"), data)
    .then(response => {
      if (response.data.success) {
        next(deleteFromCartSuccess(productKey));
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
      }
    })
    .catch(error => {
      next(deleteFromCartFail(error));
    });
};

export const setCartProductQuantityMiddleware = store => next => action => {
  if (action.type !== CART_SET_PRODUCT_QUANTITY) {
    next(action);
    return;
  }

  const {productKey, quantity} = action.payload;

  const data = new FormData();
  data.set("productKey", productKey);
  data.set("quantity", quantity);

  next(setCartProductQuantityStart(productKey));
  axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
    .then(response => {
      if (response.data.success) {
        next(setCartProductQuantitySuccess(productKey, response.data.data.quantity));
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
      }
    })
    .catch(error => {
      next(setCartProductQuantityFail(error));
    });

};