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
    const key = action.payload.key;

    const data = new FormData();
    data.set('key', key);

    next(deleteFromCartStart(key));
    axios.post(ajaxEndpoint('rewooc_delete_from_cart'), data).then(response => {
        console.log(response.data.success);
        if (response.data.success) {
            next(deleteFromCartSuccess(key));
        } else {
            throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
        }
    }).catch(error => {
        next(deleteFromCartFail(error));
    });
};