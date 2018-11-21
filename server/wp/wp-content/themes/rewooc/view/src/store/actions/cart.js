import {ajaxEndpoint} from '../../shared/utilities';
import * as actionTypes from './index';
import axios from 'axios';

const addToCartStart = (id) => {
    return {type: actionTypes.ADD_TO_CART_START, id: id}
};

const addToCartSuccess = (cart) => {
    return {type: actionTypes.ADD_TO_CART_SUCCESS, cart: cart}
};

const addToCartFail = (error) => {
    return {type: actionTypes.ADD_TO_CART_FAIL, error: error}
};

export const addToCart = (id, event) => {
    event.preventDefault();

    return dispatch => {
        dispatch(addToCartStart(id));

        let params = new FormData();
        params.set('productId', id);

        axios.post(ajaxEndpoint('rewooc_add_to_cart'), params).then(({data}) => {
            if (!data.error) {
                dispatch(addToCartSuccess(data))
            } else {
                dispatch(addToCartFail(data.error))
            }
        }).catch(() => {
            dispatch(addToCartFail('some error'))
        });
    }
};
