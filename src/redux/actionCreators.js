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
  CART_PAGE_LOAD_FAIL, USER_SIGN_IN_START, USER_SIGN_IN_SUCCESS, USER_SIGN_IN_FAIL, USER_SIGN_OUT
} from "./actionTypes";
import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {ErrorMessage} from "../shared/errorMessages";

export const initApp = () => {
  return dispatch => {
    dispatch({type: INIT_APP_START});
    axios.get(ajaxEndpoint("rewooc_get_common_data")).then(({data}) => {
      dispatch({type: INIT_APP_SUCCESS, payload: data})
    }).catch(error => {
      dispatch({type: INIT_APP_FAIL, error})
    })
  }
};

export const addToCart = (productId, quantity) => {
  return (dispatch, getState) => {

    const itemInCart = getState().cart.items.find(item => item.productId === productId);
    if (itemInCart) {
      const totalQuantity = parseInt(quantity) + parseInt(itemInCart.quantity);
      dispatch(setCartProductQuantity(itemInCart.key, totalQuantity));
      return;
    }

    dispatch({type: CART_ADD_PRODUCT_START, payload: {productId}});

    const params = new FormData();
    params.set("productId", productId);
    params.set("quantity", quantity);

    axios.post(ajaxEndpoint("rewooc_add_to_cart"), params).then(response => {
      const {success, data} = response.data;
      if (success && data) {
        dispatch({type: CART_ADD_PRODUCT_SUCCESS, payload: {cartItem: data}});
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

    if (parseInt(quantity) === 0) {
      dispatch(deleteFromCart(productKey));
      return;
    }

    const data = new FormData();
    data.set("productKey", productKey);
    data.set("quantity", quantity);

    dispatch({type: CART_SET_PRODUCT_QUANTITY_START, payload: {productKey}});
    axios.post(ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
      .then(response => {
        const {success, data} = response.data;
        if (success && data) {
          dispatch({type: CART_SET_PRODUCT_QUANTITY_SUCCESS, payload: {cartItem: data}});
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

export const signIn = (username, password) => dispatch => {
  dispatch({type: USER_SIGN_IN_START});

  const params = new URLSearchParams();
  params.append("username", username);
  params.append("password", password);

  axios.post(ajaxEndpoint("rewooc_get_current_user"), params).then(result => {
    const {success, data} = result.data;
    if (success && data) {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      dispatch(signInSuccess(data.userId, data.token));
    } else {
      throw new Error(ErrorMessage.USER_FAIL_TO_SIGN_IN);
    }
  }).catch(error => {
    dispatch({type: USER_SIGN_IN_FAIL, error});
  });
};

export const signInSuccess = (userId, token) => {
  return {type: USER_SIGN_IN_SUCCESS, payload: {userId, token}}
};

export const signOut = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  return {type: USER_SIGN_OUT}
};

export const checkAuth = () => dispatch => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  if (!token) {
    dispatch(signOut());
  } else {
    dispatch(signInSuccess(userId, token));
  }
};