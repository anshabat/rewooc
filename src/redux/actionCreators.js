import {
    CART_ADD_PRODUCT
} from './actionTypes';

export const addToCart = (e, productId) => {
    console.log('action load homepage');
    return {
        type: CART_ADD_PRODUCT,
        payload: {productId}
    }
};