import {
  CART_ADD_PRODUCT_START,
  CART_ADD_PRODUCT_SUCCESS,
  CART_ADD_PRODUCT_FAIL,
  CART_DELETE_PRODUCT_SUCCESS,
  CART_DELETE_PRODUCT_START,
  CART_DELETE_PRODUCT_FAIL,
  CART_SET_PRODUCT_QUANTITY_START,
  CART_SET_PRODUCT_QUANTITY_SUCCESS,
  CART_SET_PRODUCT_QUANTITY_FAIL, INIT_APP_START, INIT_APP_SUCCESS
} from "../actionTypes";

export const initialState = {
    products: [],
    addingProductId: null,
    deletingProductKey: null,
    changingQuantityKey: null
};

export default function reducer(state = initialState, action) {
  //console.log(action);
  //console.log(state);
  let products;
  switch (action.type) {
    case INIT_APP_SUCCESS:
      return {...state, products: action.payload.data.cart};
    case CART_ADD_PRODUCT_START:
      return {...state, addingProductId: action.payload.productId};
    case CART_ADD_PRODUCT_SUCCESS:
      products = addProduct(state, action.payload.product);
      return {...state, products, addingProductId: null};
    case CART_ADD_PRODUCT_FAIL:
      return {...state, addingProductId: null};
    case CART_DELETE_PRODUCT_START:
      return {...state, deletingProductKey: action.payload.productKey};
    case CART_DELETE_PRODUCT_SUCCESS:
      products = deleteProduct(state, action.payload.productKey);
      return {...state, products, deletingProductKey: null};
    case CART_DELETE_PRODUCT_FAIL:
      return {...state, deletingProductKey: null};
    case CART_SET_PRODUCT_QUANTITY_START:
      return {...state, changingQuantityKey: action.payload.productKey};
    case CART_SET_PRODUCT_QUANTITY_SUCCESS:
      products = changeQuantity(state, action.payload.productKey, action.payload.quantity);
      return {...state, products, changingQuantityKey: null};
    case CART_SET_PRODUCT_QUANTITY_FAIL:
      return {...state, changingQuantityKey: null};
    default:
      return state;
  }
};

const addProduct = (state, newProduct) => {
  const products = [...state.products];
  const productIndex = products.findIndex(product => product.id === newProduct.id);
  if (productIndex !== -1) {
    products[productIndex].quantity = newProduct.quantity
  } else {
    products.push(newProduct);
  }

  return products;
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
