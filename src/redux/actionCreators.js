import {
  CART_ADD_PRODUCT,
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL
} from "./actionTypes";

export const addToCart = (productId, quantity) => {
  return {type: CART_ADD_PRODUCT, payload: {productId, quantity}}
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
  return {type: CART_DELETE_PRODUCT, payload: {productKey}}
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
  return {type: CART_SET_PRODUCT_QUANTITY, payload: {productKey, quantity: Number(quantity)}}
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