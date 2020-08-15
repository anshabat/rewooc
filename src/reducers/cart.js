import {INIT_APP_SUCCESS} from '../actions/initApp';
import {CART_PAGE_LOAD_FAIL, CART_PAGE_LOAD_START, CART_PAGE_LOAD_SUCCESS} from '../actions/loadCartPage';
import {CART_ADD_PRODUCT_FAIL, CART_ADD_PRODUCT_START, CART_ADD_PRODUCT_SUCCESS} from '../actions/addToCart';
import {
  CART_DELETE_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_SUCCESS
} from '../actions/deleteFromCart';
import {
  CART_SET_PRODUCT_QUANTITY_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS
} from '../actions/setCartProductQuantity';
import {fromJS, List, Record, Map} from "immutable";

export const initialState = Record({
  title: null,
  loading: false,
  error: false,
  products: List([]),
  items: List([]),
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null
});

export default function reducer(state = new initialState(), action) {
  const {type, payload, error} = action;
  let items, products;

  switch (type) {
    case INIT_APP_SUCCESS:
      items = getCartItems(state, fromJS(payload.cart));
      products = getCartProducts(state, fromJS(payload.cart));
      return state.set('items', items).set('products', products);
    case CART_PAGE_LOAD_START:
      return state.set('loading', true)
    case CART_PAGE_LOAD_SUCCESS:
      return state.set('loading', false).set('title', payload.title)
    case CART_PAGE_LOAD_FAIL:
      return {...state, loading: false, error: error};
    case CART_ADD_PRODUCT_START:
      return {...state, addingProductId: payload.productId};
    case CART_ADD_PRODUCT_SUCCESS:
      items = addItem(state, payload.cartItem);
      products = addProduct(state, payload.cartItem);
      return {...state, items, products, addingProductId: null};
    case CART_ADD_PRODUCT_FAIL:
      return {...state, addingProductId: null, error: error};
    case CART_DELETE_PRODUCT_START:
      return {...state, deletingProductKey: payload.productKey};
    case CART_DELETE_PRODUCT_SUCCESS:
      items = deleteItem(state, payload.productKey);
      products = deleteProduct(state, payload.productKey);
      return {...state, items, products, deletingProductKey: null};
    case CART_DELETE_PRODUCT_FAIL:
      return {...state, deletingProductKey: null, error: error};
    case CART_SET_PRODUCT_QUANTITY_START:
      const product = state.items.find(item => item.key === payload.productKey);
      return {...state, changingQuantityKey: payload.productKey, addingProductId: product.productId};
    case CART_SET_PRODUCT_QUANTITY_SUCCESS:
      items = changeQuantity(state, payload.cartItem);
      return {...state, items, changingQuantityKey: null, addingProductId: null};
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return {...state, changingQuantityKey: null, error: error};
    default:
      return state;
  }
};

const getCartItems = (state, cart) => {
  return cart.toList().map(item => cartItemAdapter(item));
};

const getCartProducts = (state, cartItems) => {
  return cartItems.toList().reduce((products, item) => {
    const exist = products.find(p => p.get('id') === item.get(['data', 'id']));
    if (!exist) {
      return products.push(item.get('data'));
    }

    return products;
  }, List([]));

};

const addItem = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);

  return state.items.concat(newItem);
};

const addProduct = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  const newProduct = serverItem.data;
  const products = [...state.products];
  const exist = products.find(product => product.id === newItem.productId);
  if (!exist) {
    products.push(newProduct);
  }

  return products;
};

const deleteItem = (state, key) => {
  return state.items.filter(item => item.key !== key);
};

const deleteProduct = (state, key) => {
  const productId = state.items.find(item => item.key === key).productId;
  const cartItems = state.items.filter(item => item.key !== key);
  const exist = cartItems.some(cartItem => cartItem.productId === productId);

  let items;
  if (!exist) {
    items = state.products.filter(product => product.id !== productId);
  } else {
    items = state.products
  }

  return items;

};

const changeQuantity = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  let items = [...state.items];
  const itemIndex = items.findIndex(item => item.key === newItem.key);

  items.splice(itemIndex, 1, {
    ...items[itemIndex],
    quantity: newItem.quantity,
    totalPrice: newItem.totalPrice
  });

  return items;
};

const cartItemAdapter = (item) => {
  return Map({
    key: item.get('key'),
    productId: item.get('product_id'),
    quantity: item.get('quantity'),
    totalPrice: item.get('line_total')
  })
};
