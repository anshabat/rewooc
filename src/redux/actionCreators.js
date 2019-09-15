import {
    CART_ADD_PRODUCT,
    CART_ADD_PRODUCT_START,
    CART_ADD_PRODUCT_SUCCESS,
    CART_ADD_PRODUCT_FAIL
} from './actionTypes';

export const addToCart = (event, productId) => {
    return {
        type: CART_ADD_PRODUCT,
        payload: {productId}
    }
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

