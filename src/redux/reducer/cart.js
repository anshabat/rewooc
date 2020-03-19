import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL, INIT_APP_SUCCESS, CART_PAGE_LOAD_START, CART_PAGE_LOAD_SUCCESS, CART_PAGE_LOAD_FAIL
} from "../actionTypes";
import {cartItemAdapter} from "../utils";

export const initialState = {
  title: null,
  loading: false,
  error: false,
  products: [],
  items: [],
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null
};

/**
 * 1 - загрузка АПП
 * 2 - загрузка Сторінки
 * 3 - Додавання в корзину
 */

export default function reducer(state = initialState, action) {
  //console.log(action);
  //console.log(state);

  const {type, payload, error} = action;
  let items;

  switch (type) {
    case INIT_APP_SUCCESS:
      items = getCartItems(state, payload.data.cart);
      //const {cart} = payload.data;
      return {...state, items: items};
    case CART_PAGE_LOAD_START:
      return {...state, loading: true};
    case CART_PAGE_LOAD_SUCCESS:
      return {...state, loading: false, title: payload.title};
    case CART_PAGE_LOAD_FAIL:
      return {...state, loading: false, error: error};
    case CART_ADD_PRODUCT_START:
      return {...state, addingProductId: payload.productId};
    case CART_ADD_PRODUCT_SUCCESS:
      items = addItem(state, payload.cartItem);
      return {...state, items, addingProductId: null};
    case CART_ADD_PRODUCT_FAIL:
      return {...state, addingProductId: null, error: error};
    case CART_DELETE_PRODUCT_START:
      return {...state, deletingProductKey: payload.productKey};
    case CART_DELETE_PRODUCT_SUCCESS:
      items = deleteProduct(state, payload.productKey);
      return {...state, items, deletingProductKey: null};
    case CART_DELETE_PRODUCT_FAIL:
      return {...state, deletingProductKey: null, error: error};
    case CART_SET_PRODUCT_QUANTITY_START:
      return {...state, changingQuantityKey: payload.productKey};
    case CART_SET_PRODUCT_QUANTITY_SUCCESS:
      items = changeQuantity(state, payload.cartItem);
      return {...state, items, changingQuantityKey: null};
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return {...state, changingQuantityKey: null, error: error};
    default:
      return state;
  }
};

const getCartItems = (state, cart) => {
  return Object.values(cart).map(item => {
    return cartItemAdapter(item);
  });
};

const addItem = (state, newItem) => {
  const items = [...state.items];
  const itemIndex = items.findIndex(item => item.productId === newItem.productId);

  if (itemIndex !== -1) {
    changeQuantity(state, newItem);
  } else {
    items.push(newItem);
  }

  return items;
};

const deleteProduct = (state, key) => {
  return state.items.filter(item => item.key !== key);
};

const changeQuantity = (state, newItem) => {
  let items = [...state.items];

  if (newItem.quantity === 0) {
    return deleteProduct(state, newItem.key);
  }

  const itemIndex = items.findIndex(item => item.key === newItem.key);
  items[itemIndex].quantity = newItem.quantity;
  items[itemIndex].totalPrice = newItem.totalPrice;

  return items;
};
