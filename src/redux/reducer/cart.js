import {
    CART_ADD_PRODUCT
} from '../actionTypes';

export default (state, action) => {
    switch (action.type) {
        case CART_ADD_PRODUCT:
            return {...state, cart: {...state.cart, count: state.cart.count+1}};
        default:
            return state
    }
};