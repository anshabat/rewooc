export const CART_PAGE_LOAD = 'CART_PAGE_LOAD';
export const CART_PAGE_LOAD_SUCCESS = 'CART_LOAD_SUCCESS';
export const CART_PAGE_LOAD_FAIL = 'CART_LOAD_FAIL';

export const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
export const CART_ADD_PRODUCT_SUCCESS = "CART_ADD_PRODUCT_SUCCESS";
export const CART_ADD_PRODUCT_FAIL = "CART_ADD_PRODUCT_FAIL";

export const CART_DELETE_PRODUCT = "CART_DELETE_PRODUCT";
export const CART_DELETE_PRODUCT_SUCCESS = "CART_DELETE_PRODUCT_SUCCESS";
export const CART_DELETE_PRODUCT_FAIL = "CART_DELETE_PRODUCT_FAIL";

export const CART_SET_PRODUCT_QUANTITY = "CART_SET_PRODUCT_QUANTITY";
export const CART_SET_PRODUCT_QUANTITY_START = "CART_SET_PRODUCT_QUANTITY_START";
export const CART_SET_PRODUCT_QUANTITY_SUCCESS = "CART_SET_PRODUCT_QUANTITY_SUCCESS";
export const CART_SET_PRODUCT_QUANTITY_FAIL = "CART_SET_PRODUCT_QUANTITY_FAIL";

export const loadCartPage = (url) => {
  return {type: CART_PAGE_LOAD, payload: {url}};
};

export const loadCartPageSuccess = (data) => {
  return {type: CART_PAGE_LOAD_SUCCESS, payload: {title: data.title}};
};

export const loadCartPageFail = (error) => {
  return {type: CART_PAGE_LOAD_FAIL, error};
};

export const addToCart = (productId, quantity) => {
  return {type: CART_ADD_PRODUCT, payload: {productId, quantity}}
};

export const addToCartSuccess = (data) => {
  return {type: CART_ADD_PRODUCT_SUCCESS, payload: {cartItem: data}};
};

export const addToCartFail = (error) => {
  return {type: CART_ADD_PRODUCT_FAIL, error};
};

export const setCartProductQuantity = (productKey, quantity) => {
  return {type: CART_SET_PRODUCT_QUANTITY, payload: {productKey, quantity}}
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

export const deleteFromCart = (productKey) => {
  return {type: CART_DELETE_PRODUCT, payload: {productKey}}
};

export const deleteFromCartSuccess = (productKey) => {
  return {type: CART_DELETE_PRODUCT_SUCCESS, payload: {productKey}};
};

export const deleteFromCartFail = (error) => {
  return {type: CART_DELETE_PRODUCT_FAIL, error};
};