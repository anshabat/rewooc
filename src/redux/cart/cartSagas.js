import axios from "axios";
import {call, put, takeEvery, select} from "redux-saga/effects";
import {
  CART_PAGE_LOAD,
  CART_ADD_PRODUCT,
  CART_SET_PRODUCT_QUANTITY,
  CART_DELETE_PRODUCT,
  loadCartPageFail,
  loadCartPageSuccess,
  addToCartFail,
  addToCartSuccess,
  setCartProductQuantity, setCartProductQuantityFail, setCartProductQuantityStart,
  setCartProductQuantitySuccess,
  deleteFromCart,
  deleteFromCartFail,
  deleteFromCartSuccess
} from "./cartActions";
import {ajaxEndpoint} from "../../shared/utilities";
import {selectCartItems} from "./cartSelectors";
import {ErrorMessage} from "../../shared/errorMessages";

/**
 * All Cart Sagas
 */
export const cartSagas = function* () {
  yield takeEvery(CART_PAGE_LOAD, loadCartPageSaga);
  yield takeEvery(CART_ADD_PRODUCT, addToCartSaga);
  yield takeEvery(CART_SET_PRODUCT_QUANTITY, setCartProductQuantitySaga);
  yield takeEvery(CART_DELETE_PRODUCT, deleteFromCartSaga);
}

/**
 * Load Cart Page Saga
 * @param action
 */
const loadCartPageSaga = function* (action) {
  const {payload: {url}} = action
  const {data} = yield call(axios.get, url)
  try {
    yield put(loadCartPageSuccess(data))
  } catch (error) {
    yield put(loadCartPageFail(error))
  }
}

/**
 * Add To Cart Saga
 * @param action
 */
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

/**
 * Set Cart Product Quantity Saga
 * @param action
 */
const setCartProductQuantitySaga = function* (action) {
  const {payload: {productKey, quantity}} = action

  if (parseInt(quantity) === 0) {
    yield put(deleteFromCart(productKey));
    return;
  }

  const data = new FormData();
  data.set("productKey", productKey);
  data.set("quantity", quantity);

  yield put(setCartProductQuantityStart(productKey));
  const response = yield call(axios.post, ajaxEndpoint("rewooc_set_cat_product_quantity"), data)
  try {
    const {success, data} = response.data;
    if (success && data) {
      yield put(setCartProductQuantitySuccess(data));
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
    }
  } catch (error) {
    yield put(setCartProductQuantityFail(error));
  }
}

/**
 * Delete From Cart Saga
 * @param action
 */
const deleteFromCartSaga = function* (action) {
  const {payload: {productKey}} = action

  const data = new FormData();
  data.set("productKey", productKey);

  try {
    const response = yield call(axios.post, ajaxEndpoint("rewooc_delete_from_cart"), data)
    if (response.data.success) {
      yield put(deleteFromCartSuccess(productKey));
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT);
    }
  } catch (error) {
    yield put(deleteFromCartFail(error));
  }
}
