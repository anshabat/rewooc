import {call, put, takeEvery} from "redux-saga/effects";
import {CART_PAGE_LOAD, loadCartPageFail, loadCartPageSuccess} from "../actions/loadCartPage";
import {CART_SET_PRODUCT_QUANTITY} from "../actions/setCartProductQuantity";
import {CART_ADD_PRODUCT} from "../actions/addToCart";
import {CART_DELETE_PRODUCT} from "../actions/deleteFromCart";
import axios from "axios";
import {ajaxEndpoint} from "../shared/utilities";
import {initAppFail, initAppSuccess} from "../actions/initApp";

export const cartSagas = function* () {
  yield takeEvery(CART_PAGE_LOAD, loadCartPage);
  /*yield takeEvery(CART_ADD_PRODUCT, addToCart);
  yield takeEvery(CART_SET_PRODUCT_QUANTITY, setCartProductQuantity);
  yield takeEvery(CART_DELETE_PRODUCT, deleteFromCart);*/
}

const loadCartPage = function* (action) {
  const {payload: {url}} = action
  const {data} = yield call(axios.get, url)
  try {
    yield put(loadCartPageSuccess(data))
  } catch (error) {
    yield put(loadCartPageFail(error))
  }
}
const addToCart = function* () {
}
const setCartProductQuantity = function* () {
}
const deleteFromCart = function* () {
}
