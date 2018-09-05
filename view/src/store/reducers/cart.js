import * as actionTypes from '../actions';

const initialState = {
    cart: window.rewooc.cart
};

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_TO_CART_SUCCESS :
            return {cart: action.cart};
        case actionTypes.ADD_TO_CART_FAIL :
            console.log(action.error);
            return state;
    }
    return state;
};

export default reducer;