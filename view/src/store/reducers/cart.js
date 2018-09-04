const initialState = {
    cart: window.rewooc.cart
};

const reducer = (state = initialState, action) => {
    if(action.type === 'ADD_TO_CART') {
        console.log(state);
    }
    return state;
};

export default reducer;