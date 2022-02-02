import { cartApi } from 'app-api'
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
import {
  IAddToCartAction,
  IDeleteFromCartAction,
  ILoadCartPageAction,
  ISetCartProductQuantityAction,
} from './cartTypes'
import { Await } from "../../shared/utilityTypes";

/**
 * Load Cart Page Saga
 * @param action
 */
function* loadCartPageSaga(action: ILoadCartPageAction) {
  try {
    const data: Await<ReturnType<typeof cartApi.fetchCartPage>> = yield call(
      cartApi.fetchCartPage,
      action.payload.url
    )
    yield put(loadCartPageSuccess(data))
  } catch (error: any) {
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

  /* Increment quantity if items is already in the cart */
  const cartItems: ReturnType<typeof selectCartItems> = yield select(
    selectCartItems
  )
  const itemInCart = cartItems.find((item) => item.product?.id === productId)
  if (itemInCart) {
    const totalQuantity = quantity + itemInCart.quantity
    yield put(setCartProductQuantity(itemInCart.key, totalQuantity))
    return
  }

  /* Add new item to the cart */
  try {
    const cartData: Await<ReturnType<typeof cartApi.addToCart>> = yield call(
      cartApi.addToCart,
      productId,
      quantity
    )
    yield put(addToCartSuccess(cartData))
  } catch (error: any) {
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

  try {
    const cartData: Await<
      ReturnType<typeof cartApi.setProductQuantity>
    > = yield call(cartApi.setProductQuantity, productKey, quantity)
    yield put(setCartProductQuantitySuccess(cartData))
  } catch (error: any) {
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
    yield call(cartApi.deleteProductFromCart, productKey)
    yield put(deleteFromCartSuccess(productKey))
  } catch (error: any) {
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
