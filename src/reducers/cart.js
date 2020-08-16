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
      const cart = fromJS(payload.cart)
      items = getCartItems(state, cart);
      products = getCartProducts(state, cart);
      return state.set('items', items).set('products', products);
    case CART_PAGE_LOAD_START:
      return state.set('loading', true)
    case CART_PAGE_LOAD_SUCCESS:
      return state.set('loading', false).set('title', payload.title)
    case CART_PAGE_LOAD_FAIL:
      return state.set('loading', false).set('error', error);
    case CART_ADD_PRODUCT_START:
      return state.set('addingProductId', payload.productId);
    case CART_ADD_PRODUCT_SUCCESS:
      const cartItem = fromJS(payload.cartItem)
      items = addItem(state, cartItem);
      products = addProduct(state, cartItem);
      return state.set('items', items).set('products', products).set('addingProductId', null);
    case CART_ADD_PRODUCT_FAIL:
      return state.set('addingProductId', null).set('error', error);
    case CART_DELETE_PRODUCT_START:
      return state.set('deletingProductKey', payload.productKey);
    case CART_DELETE_PRODUCT_SUCCESS:
      items = deleteItem(state, payload.productKey);
      products = deleteProduct(state, payload.productKey);
      return state.set('items', items).set('products', products).set('deletingProductKey', null);
    case CART_DELETE_PRODUCT_FAIL:
      return state.set('deletingProductKey', null).set('error', error);
    case CART_SET_PRODUCT_QUANTITY_START:
      const product = state.items.find(item => item.get('key') === payload.productKey);
      return state.set('changingQuantityKey', payload.productKey).set('addingProductId', product.productId);
    case CART_SET_PRODUCT_QUANTITY_SUCCESS:
      items = changeQuantity(state, fromJS(payload.cartItem));
      return state.set('items', items).set('changingQuantityKey', null).set('addingProductId', null);
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return state.set('changingQuantityKey', null).set('error', error);
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

  return state.items.push(newItem);
};

const addProduct = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  const newProduct = serverItem.get('data');
  const products = state.get('products');
  const exist = products.find(product => product.get('id') === newItem.get('productId'));
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
  let items = state.get('items');
  const itemIndex = items.findIndex(item => item.get('key') === newItem.get('key'));

  const newItems = items.splice(itemIndex, 1, Map({
    ...items[itemIndex],
    quantity: newItem.get('quantity'),
    totalPrice: newItem.get('totalPrice')
  }));

  return newItems;
};

const cartItemAdapter = (item) => {
  return Map({
    key: item.get('key'),
    productId: item.get('product_id'),
    quantity: item.get('quantity'),
    totalPrice: item.get('line_total')
  })
};
