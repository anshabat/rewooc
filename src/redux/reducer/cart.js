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

export default function reducer(state = initialState, action) {
  const {type, payload, error} = action;
  let items, products;

  switch (type) {
    case INIT_APP_SUCCESS:
      items = getCartItems(state, payload.cart);
      products = getCartProducts(state, payload.cart);
      return {...state, items, products};
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

const getCartProducts = (state, cartItems) => {
  return Object.values(cartItems).reduce((products, item) => {
    const exist = products.find(p => p.id === item.data.id);
    if (!exist) {
      products.push(item.data);
    }
    return products;
  }, []);

};

const addItem = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  const items = [...state.items];
  const itemIndex = items.findIndex(item => item.productId === newItem.productId);

  if (itemIndex !== -1) {
    changeQuantity(state, serverItem);
  } else {
    items.push(newItem);
  }

  return items;
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

  if (!exist) {
    return state.products.filter(product => product.id !== productId);
  } else {
    return state.products
  }

};

const changeQuantity = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  let items = [...state.items];

  if (newItem.quantity === 0) {
    return deleteItem(state, newItem.key);
  }

  const itemIndex = items.findIndex(item => item.key === newItem.key);
  items[itemIndex].quantity = newItem.quantity;
  items[itemIndex].totalPrice = newItem.totalPrice;

  return items;
};

const cartItemAdapter = (item) => {
  return {
    key: item.key,
    productId: item.product_id,
    quantity: item.quantity,
    totalPrice: item.line_total
  }
};
