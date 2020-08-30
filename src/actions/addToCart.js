export const CART_ADD_PRODUCT = "CART_ADD_PRODUCT";
export const CART_ADD_PRODUCT_SUCCESS = "CART_ADD_PRODUCT_SUCCESS";
export const CART_ADD_PRODUCT_FAIL = "CART_ADD_PRODUCT_FAIL";

export const addToCart = (productId, quantity) => {
  return {type: CART_ADD_PRODUCT, payload: {productId, quantity}}
};

export const addToCartSuccess = (data) => {
  return {type: CART_ADD_PRODUCT_SUCCESS, payload: {cartItem: data}};
};

export const addToCartFail = (error) => {
  return {type: CART_ADD_PRODUCT_FAIL, error};
};