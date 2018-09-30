import * as actionTypes from '../actions';

const initialState = {
    cart: window.rewooc.cart,
    addingId: 0
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART_START:
            return {
                cart: state.cart,
                addingId: action.id
            };
        case actionTypes.ADD_TO_CART_SUCCESS :
            return {
                cart: action.cart,
                addingId: 0
            };
        case actionTypes.ADD_TO_CART_FAIL :
            console.log(action.error);
            return {
                cart: state.cart,
                addingId: 0
            };
    }
    return state;
};

export default reducer;