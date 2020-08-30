import axios from "axios";
import {call, put, takeEvery, select} from "redux-saga/effects";
import {CART_PAGE_LOAD, loadCartPageFail, loadCartPageSuccess} from "../actions/loadCartPage";
import {addToCartFail, addToCartSuccess, CART_ADD_PRODUCT} from "../actions/addToCart";
import {CART_SET_PRODUCT_QUANTITY, setCartProductQuantity} from "../actions/setCartProductQuantity";
import {CART_DELETE_PRODUCT} from "../actions/deleteFromCart";
import {ajaxEndpoint} from "../shared/utilities";
import {selectCartItems} from "../selectors";
import {ErrorMessage} from "../shared/errorMessages";

export const cartSagas = function* () {
  yield takeEvery(CART_PAGE_LOAD, loadCartPageSaga);
  yield takeEvery(CART_ADD_PRODUCT, addToCartSaga);
  /*yield takeEvery(CART_SET_PRODUCT_QUANTITY, setCartProductQuantity);
  yield takeEvery(CART_DELETE_PRODUCT, deleteFromCart);*/
}

const loadCartPageSaga = function* (action) {
  const {payload: {url}} = action
  const {data} = yield call(axios.get, url)
  try {
    yield put(loadCartPageSuccess(data))
  } catch (error) {
    yield put(loadCartPageFail(error))
  }
}
const addToCartSaga = function* (action) {
  const {payload: {productId, quantity}} = action
  const cartItems = yield select(selectCartItems)
  const itemInCart = cartItems.find(item => item.productId === productId);
  if (itemInCart) {
    const totalQuantity = parseInt(quantity) + parseInt(itemInCart.quantity);
    yield put(setCartProductQuantity(itemInCart.key, totalQuantity));
    return;
  }

  const params = new FormData();
  params.set("productId", productId);
  params.set("quantity", quantity);

  try {
    const response = yield call(axios.post, ajaxEndpoint("rewooc_add_to_cart"), params)
    const {success, data} = response.data;
    if (success && data) {
      yield put(addToCartSuccess(data));
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT);
    }
  } catch (error) {
    yield put(addToCartFail(error));
  }
}
const setCartProductQuantitySaga = function* () {
}
const deleteFromCartSaga = function* () {
}
