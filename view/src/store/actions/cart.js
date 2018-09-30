import * as utils from '../../shared/index';
import * as actionTypes from './index';

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
        jQuery.ajax({
            url: utils.getAjaxEndpoint('rewooc_add_to_cart'),
            method: 'post',
            data: {
                productId: id
            },
            success: (cartData) => {
                if (!cartData.error) {
                    dispatch(addToCartSuccess(cartData))
                } else {
                    dispatch(addToCartFail(cartData.error))
                }
            },
            error: () => {
                dispatch(addToCartFail('some error'))
            }
        });
    }
};
