export const selectCartData = (state) => {
  return state.cart.items.map(item => {
    const product = state.cart.products.find(product => product.get('id') === item.get('productId'));
    return item.set('product', product);
  }).toJS()
};

export const selectCartItems = (state) => {
  return state.cart.items.toJS()
};

export const selectCartTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.get('totalPrice');
  }, 0);
};

export const selectCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.get('quantity');
  }, 0);
};