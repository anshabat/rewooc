import axios from 'axios';

export const CART_PAGE_LOAD_START = 'CART_LOAD_START';
export const CART_PAGE_LOAD_SUCCESS = 'CART_LOAD_SUCCESS';
export const CART_PAGE_LOAD_FAIL = 'CART_LOAD_FAIL';

export const loadCartPage = (url) => {
  return dispatch => {
    dispatch(loadCartPageStart());
    axios.get(url).then(({data}) => {
      dispatch(loadCartPageSuccess(data));
    }).catch(error => {
      dispatch(loadCartPageFail(error))
    })
  }
};

export const loadCartPageStart = () => {
  return {type: CART_PAGE_LOAD_START};
};

export const loadCartPageSuccess = (data) => {
  return {type: CART_PAGE_LOAD_SUCCESS, payload: {title: data.title}};
};

export const loadCartPageFail = (error) => {
  return {type: CART_PAGE_LOAD_FAIL, error};
};