export const getCartTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
};

export const getCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

export const getCartItems = (state) => {
  return state.cart.items.map(item => {
    const product = state.cart.products.find(product => product.id === item.productId);
    return {...item, product};
  })
};

export const isProductInCart = (state, productId) => {
  return state.cart.items.some(item => item.productId === productId);
};

export const addingProductToCart = (state, productId) => {
  return state.cart.addingProductId === productId
};