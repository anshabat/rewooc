export const CART_DELETE_PRODUCT = "CART_DELETE_PRODUCT";
export const CART_DELETE_PRODUCT_SUCCESS = "CART_DELETE_PRODUCT_SUCCESS";
export const CART_DELETE_PRODUCT_FAIL = "CART_DELETE_PRODUCT_FAIL";

export const deleteFromCart = (productKey) => {
  return {type: CART_DELETE_PRODUCT, payload: {productKey}}
};

export const deleteFromCartSuccess = (productKey) => {
  return {type: CART_DELETE_PRODUCT_SUCCESS, payload: {productKey}};
};

export const deleteFromCartFail = (error) => {
  return {type: CART_DELETE_PRODUCT_FAIL, error};
};