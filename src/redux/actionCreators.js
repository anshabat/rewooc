import * as ac from './actionTypes';

export const addToCart = () => {
    console.log('action load homepage');
    return {
        type: ac.CART_PRODUCT_START
    }
};