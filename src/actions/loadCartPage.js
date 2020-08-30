export const CART_PAGE_LOAD = 'CART_PAGE_LOAD';
export const CART_PAGE_LOAD_SUCCESS = 'CART_LOAD_SUCCESS';
export const CART_PAGE_LOAD_FAIL = 'CART_LOAD_FAIL';

export const loadCartPage = (url) => {
  return {type: CART_PAGE_LOAD, payload: {url}};
};

export const loadCartPageSuccess = (data) => {
  return {type: CART_PAGE_LOAD_SUCCESS, payload: {title: data.title}};
};

export const loadCartPageFail = (error) => {
  return {type: CART_PAGE_LOAD_FAIL, error};
};