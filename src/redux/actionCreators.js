import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL,
  INIT_APP_START,
  INIT_APP_SUCCESS,
  INIT_APP_FAIL,
  PRODUCTS_LOAD_START,
  PRODUCTS_LOAD_SUCCESS,
  PRODUCTS_LOAD_FAIL
} from "./actionTypes";
import axios from "axios";
import {ajaxEndpoint, apiUrl} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";

export const initApp = () => {
  return dispatch => {
    dispatch(initAppStart());
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      dispatch(initAppSuccess(data))
    }).catch(error => {
      dispatch(initAppFail(error))
    })
  }
};

export const initAppStart = () => {
  return {type: INIT_APP_START}
};
export const initAppSuccess = (data) => {
  return {type: INIT_APP_SUCCESS, payload: {data}}
};
export const initAppFail = (error) => {
  return {type: INIT_APP_FAIL, error}
};

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

export const loadProducts = (url) => {
  return dispatch => {
    dispatch(loadProductsStart());
    axios.get(url).then(({data}) => {
      dispatch(loadProductsSuccess(data.products));
    }).catch(error => {
      dispatch(loadProductsFail(error))
    })
  }
};

export const loadProductsStart = () => {
  return {type: PRODUCTS_LOAD_START}
};

export const loadProductsSuccess = products => {
  return {type: PRODUCTS_LOAD_SUCCESS, payload: {products}}
};

export const loadProductsFail = error => {
  return {type: PRODUCTS_LOAD_FAIL, error}
};