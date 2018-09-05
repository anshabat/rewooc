import * as actionTypes from '../actions';

const initialState = {
    cart: window.rewooc.cart
};

const reducer = (state = initialState, action) => {
    if(action.type === actionTypes.ADD_TO_CART_SUCCESS) {
        console.log(action);
    }
    return state;
};

export default reducer;