import {
    CART_ADD_PRODUCT,
    CART_ADD_PRODUCT_START,
    CART_ADD_PRODUCT_SUCCESS,
    CART_ADD_PRODUCT_FAIL,
    CART_DELETE_PRODUCT,
    CART_DELETE_PRODUCT_START,
    CART_DELETE_PRODUCT_SUCCESS,
    CART_DELETE_PRODUCT_FAIL
} from './actionTypes';

export const addToCart = (event, productId) => {
    return {type: CART_ADD_PRODUCT, payload: {productId}}
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

export const deleteFromCart = (productId) => {
    return {type: CART_DELETE_PRODUCT, payload: {productId}}
};

export const deleteFromCartStart = (productId) => {
    return {type: CART_DELETE_PRODUCT_START, payload: {productId}}
};

export const deleteFromCartSuccess = (productId) => {
    return {type: CART_DELETE_PRODUCT_SUCCESS, payload: {productId}}
};

export const deleteFromCartFail = (error) => {
    return {type: CART_DELETE_PRODUCT_FAIL, error}
};
