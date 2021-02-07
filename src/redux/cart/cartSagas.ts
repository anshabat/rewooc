import { cartApi } from 'app-data'
import { call, put, takeEvery, select } from 'redux-saga/effects'
import {
  CART_PAGE_LOAD,
  CART_ADD_PRODUCT,
  CART_SET_PRODUCT_QUANTITY,
  CART_DELETE_PRODUCT,
  loadCartPageFail,
  loadCartPageSuccess,
  addToCartFail,
  addToCartSuccess,
  setCartProductQuantity,
  setCartProductQuantityFail,
  setCartProductQuantityStart,
  setCartProductQuantitySuccess,
  deleteFromCart,
  deleteFromCartFail,
  deleteFromCartSuccess,
} from './cartActions'
import { selectCartItems } from './cartSelectors'
import { ErrorMessage } from '../../shared/errorMessages'
import {
  IAddToCartAction,
  IDeleteFromCartAction,
  ILoadCartPageAction,
  ISetCartProductQuantityAction,
} from './cartTypes'

/**
 * Load Cart Page Saga
 * @param action
 */
function* loadCartPageSaga(action: ILoadCartPageAction) {
  const { data } = yield call(cartApi.fetchCartPage, action.payload.url)
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
function* addToCartSaga(action: IAddToCartAction) {
  const {
    payload: { productId, quantity },
  } = action
  const cartItems = yield select(selectCartItems)
  const itemInCart = cartItems.find((item) => item.productId === productId)
  if (itemInCart) {
    const totalQuantity = quantity + parseInt(itemInCart.quantity, 10)
    yield put(setCartProductQuantity(itemInCart.key, totalQuantity))
    return
  }

  try {
    const response = yield call(cartApi.addToCart, productId, quantity)
    const { success, data } = response.data
    if (success && data) {
      yield put(addToCartSuccess(data))
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_ADD_PRODUCT)
    }
  } catch (error) {
    yield put(addToCartFail(error))
  }
}

/**
 * Set Cart Product Quantity Saga
 * @param action
 */
function* setCartProductQuantitySaga(action: ISetCartProductQuantityAction) {
  const {
    payload: { productKey, quantity },
  } = action

  if (quantity === 0) {
    yield put(deleteFromCart(productKey))
    return
  }

  yield put(setCartProductQuantityStart(productKey))
  const response = yield call(cartApi.setProductQuantity, productKey, quantity)
  try {
    const { success, data } = response.data
    if (success && data) {
      yield put(setCartProductQuantitySuccess(data))
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_CHANGE_QUANTITY)
    }
  } catch (error) {
    yield put(setCartProductQuantityFail(error))
  }
}

/**
 * Delete From Cart Saga
 * @param action
 */
function* deleteFromCartSaga(action: IDeleteFromCartAction) {
  const {
    payload: { productKey },
  } = action

  try {
    const response = yield call(cartApi.deleteProductFromCart, productKey)
    if (response.data.success) {
      yield put(deleteFromCartSuccess(productKey))
    } else {
      throw new Error(ErrorMessage.CART_FAIL_TO_DELETE_PRODUCT)
    }
  } catch (error) {
    yield put(deleteFromCartFail(error))
  }
}

/**
 * All Cart Sagas
 */
export function* cartSagas() {
  yield takeEvery(CART_PAGE_LOAD, loadCartPageSaga)
  yield takeEvery(CART_ADD_PRODUCT, addToCartSaga)
  yield takeEvery(CART_SET_PRODUCT_QUANTITY, setCartProductQuantitySaga)
  yield takeEvery(CART_DELETE_PRODUCT, deleteFromCartSaga)
}
