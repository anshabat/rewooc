import {
    CART_ADD_PRODUCT_START,
    CART_ADD_PRODUCT_SUCCESS,
    CART_ADD_PRODUCT_FAIL,
    CART_DELETE_PRODUCT_SUCCESS,
    CART_DELETE_PRODUCT_START,
    CART_DELETE_PRODUCT_FAIL
} from '../actionTypes';

export const initialState = (products) => {
    return {
        products,
        addingProductId: null,
        deletingProductKey: null
    }
};

export default function reducer(state = {}, action) {
    //console.log(action);
    //console.log(state);
    switch (action.type) {
        case CART_ADD_PRODUCT_START:
            return {...state, addingProductId: action.payload.productId};
        case CART_ADD_PRODUCT_SUCCESS:
            return addProduct(state, action.payload.product);
        case CART_ADD_PRODUCT_FAIL:
            return state;
        case CART_DELETE_PRODUCT_START:
            return {...state, deletingProductKey: action.payload.productKey};
        case CART_DELETE_PRODUCT_SUCCESS:
            return deleteProduct(state, action.payload.productKey);
        case CART_DELETE_PRODUCT_FAIL:
            return state;
        case 'TEST':
            return {...state};
        default:
            return state;
    }
};

const addProduct = (state, newProduct) => {
    const products = [...state.products];
    const existingProduct = products.findIndex(product => product.id === newProduct.id);
    if (existingProduct !== -1) {
        products[existingProduct].quantity = newProduct.quantity
    } else {
        products.push(newProduct);
    }
    return {...state, products: products, addingProductId: null};
};

const deleteProduct = (state, productKey) => {
    const products = state.products.filter(product => product.key !== productKey);
    return {...state, products, deletingProductKey: null};
};
