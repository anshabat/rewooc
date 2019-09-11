import {
    CART_ADD_PRODUCT_START,
    CART_ADD_PRODUCT_SUCCESS,
    CART_ADD_PRODUCT_FAIL
} from '../actionTypes';

export const initialState = (products) => {
    console.log(products);
    return {
        products,
        addingProductId: null
    }
};

export default function reducer(state = {}, action) {
    /*console.log(action);
    console.log(state);*/
    switch (action.type) {
        case CART_ADD_PRODUCT_START:
            return {...state, addingProductId: action.payload.productId};
        case CART_ADD_PRODUCT_SUCCESS:
            return {...state, products: action.payload.products, addingProductId: null};
        case CART_ADD_PRODUCT_FAIL:
            return state;
        case 'TEST':
            return {...state};
        default:
            return state;
    }
};