import axios from 'axios';
import {CART_ADD_PRODUCT, CART_DELETE_PRODUCT} from './actionTypes';
import {
    addToCartSuccess,
    addToCartStart,
    addToCartFail,
    deleteFromCartStart,
    deleteFromCartSuccess,
    deleteFromCartFail
} from './actionCreators';
import {ajaxEndpoint} from '../shared/utilities';
import {ErrorMessage} from '../shared/errorMessages';

export const addToCartMiddleware = store => next => action => {
    if (action.type !== CART_ADD_PRODUCT) {
        next(action);
        return;
    }
    next(addToCartStart(action.payload.productId));
    axios.get(ajaxEndpoint('rewooc_add_to_cart'), {
        params: {productId: action.payload.productId}
    }).then(response => {
        const {data} = response;
        if (data) {
            next(addToCartSuccess(data));
        } else {
            throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
        }
    }).catch(error => {
        next(addToCartFail(error));
    });
};

export const deleteFromCartMiddleware = store => next => action => {
    if (action.type !== CART_DELETE_PRODUCT) {
        next(action);
        return;
    }
    const productId = action.payload.productId;

    next(deleteFromCartStart(productId));
    axios.delete('rewooc_delete_from_cart').then(response => {
        console.log(response);
        next(deleteFromCartSuccess(productId));
    }).catch(error => {
        next(deleteFromCartFail(error));
    });
};