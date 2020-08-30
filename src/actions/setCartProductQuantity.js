export const CART_SET_PRODUCT_QUANTITY = "CART_SET_PRODUCT_QUANTITY";
export const CART_SET_PRODUCT_QUANTITY_START = "CART_SET_PRODUCT_QUANTITY_START";
export const CART_SET_PRODUCT_QUANTITY_SUCCESS = "CART_SET_PRODUCT_QUANTITY_SUCCESS";
export const CART_SET_PRODUCT_QUANTITY_FAIL = "CART_SET_PRODUCT_QUANTITY_FAIL";

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