import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL, INIT_APP_SUCCESS
} from "../actionTypes";
import {cartItemAdapter} from "../utils";


/*
items: <arrayOfObjects>
  key: <string>,
  productId: <int>
  quantity: <int>>
  totalPrice: <int>

products: <arrayOfObjects>
  title: "Blouse Juicy Couture"
  link: "http://rewooc.loc/server/wp/product/blouse-juicy-couture/"
  price: "39"
  image: {,…}
  isSoldIndividually: false
  getStockQuantity: null

 */
export const initialState = {
  items: [],
  products: [],
  addingProductId: null,
  deletingProductKey: null,
  changingQuantityKey: null
};

export default function reducer(state = initialState, action) {
  //console.log(action);
  //console.log(state);
  let items;
  switch (action.type) {
    case INIT_APP_SUCCESS:
      items = getCartItems(state, action.payload.data.cart);
      return {...state, items};
    case CART_ADD_PRODUCT_START:
      return {...state, addingProductId: action.payload.productId};
    case CART_ADD_PRODUCT_SUCCESS:
      items = addProduct(state, action.payload.product);
      return {...state, items, addingProductId: null};
    case CART_ADD_PRODUCT_FAIL:
      return {...state, addingProductId: null};
    case CART_DELETE_PRODUCT_START:
      return {...state, deletingProductKey: action.payload.productKey};
    case CART_DELETE_PRODUCT_SUCCESS:
      items = deleteProduct(state, action.payload.productKey);
      return {...state, items, deletingProductKey: null};
    case CART_DELETE_PRODUCT_FAIL:
      return {...state, deletingProductKey: null};
    case CART_SET_PRODUCT_QUANTITY_START:
      return {...state, changingQuantityKey: action.payload.productKey};
    case CART_SET_PRODUCT_QUANTITY_SUCCESS:
      items = changeQuantity(state, action.payload.productKey, action.payload.quantity);
      return {...state, items, changingQuantityKey: null};
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return {...state, changingQuantityKey: null};
    default:
      return state;
  }
};

const getCartItems = (state, cart) => {
  return Object.values(cart).map(item => {
    return cartItemAdapter(item);
  });
};

const addProduct = (state, serverItem) => {
  const newItem = cartItemAdapter(serverItem);
  const items = [...state.items];
  const itemIndex = items.findIndex(item => item.productId === newItem.productId);

  if (itemIndex !== -1) {
    items[itemIndex].quantity = newItem.quantity;
    items[itemIndex].totalPrice = newItem.totalPrice;
  } else {
    items.push(newItem);
  }

  return items;
};

const deleteProduct = (state, productKey) => {
  return state.products.filter(product => product.key !== productKey);
};

const changeQuantity = (state, productKey, quantity) => {
  let products = [...state.products];

  if (quantity === 0) {
    return deleteProduct(state, productKey);
  }

  const productIndex = products.findIndex(product => product.key === productKey);
  products[productIndex].quantity = quantity;

  return products;
};
