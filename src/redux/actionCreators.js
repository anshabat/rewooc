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
  CATALOG_PAGE_LOAD_START,
  CATALOG_PAGE_LOAD_SUCCESS,
  CATALOG_PAGE_LOAD_FAIL,
  CART_PAGE_LOAD_START,
  CART_PAGE_LOAD_SUCCESS,
  CART_PAGE_LOAD_FAIL
} from "./actionTypes";
import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";
import {cartItemAdapter} from "./utils";

export const initApp = () => {
  return dispatch => {
    dispatch({type: INIT_APP_START});
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      dispatch({type: INIT_APP_SUCCESS, payload: {data}})
    }).catch(error => {
      dispatch({type: INIT_APP_FAIL, error})
    })
  }
};

export const addToCart = (productId, quantity) => {
  return dispatch => {
    dispatch({type: CART_ADD_PRODUCT_START, payload: {productId}});

    const params = new FormData();
    params.set("productId", productId);
    params.set("quantity", quantity);

    axios.post(ajaxEndpoint("rewooc_add_to_cart"), params).then(response => {
      const {success, data} = response.data;
      if (success && data) {
        const cartItem = cartItemAdapter(data);
        dispatch({type: CART_ADD_PRODUCT_SUCCESS, payload: {cartItem}});
      } else {
        throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
      }
    }).catch(error => {
      dispatch({type: CART_ADD_PRODUCT_FAIL, error});
    });
  }
};

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

export const setCartProductQuantity = (productKey, quantity) => {
  return dispatch => {
    const data = new FormData();
    data.set("productKey", productKey);
    data.set("quantity", quantity);

    dispatch({type: CART_SET_PRODUCT_QUANTITY_START, payload: {productKey}});
    axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
      .then(response => {
        const {success, data} = response.data;
        if (success && data) {
          const cartItem = cartItemAdapter(data);
          dispatch({type: CART_SET_PRODUCT_QUANTITY_SUCCESS, payload: {cartItem}});
        } else {
          throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
        }
      })
      .catch(error => {
        dispatch({type: CART_SET_PRODUCT_QUANTITY_FAIL, error});
      });
  }
};

export const loadCatalogPage = (url) => {
  return dispatch => {
    dispatch({type: CATALOG_PAGE_LOAD_START});
    axios.get(url).then(({data}) => {
      dispatch({
        type: CATALOG_PAGE_LOAD_SUCCESS,
        payload: {
          products: data.products,
          title: data.title
        }
      });
    }).catch(error => {
      dispatch({type: CATALOG_PAGE_LOAD_FAIL, error})
    })
  }
};

export const loadCartPage = (url) => {
  return dispatch => {
    dispatch({type: CART_PAGE_LOAD_START});
    axios.get(url).then(({data}) => {
      dispatch({
        type: CART_PAGE_LOAD_SUCCESS,
        payload: {
          title: data.title
        }
      });
    }).catch(error => {
      dispatch({type: CART_PAGE_LOAD_FAIL, error})
    })
  }
};