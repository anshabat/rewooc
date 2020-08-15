/*export const selectCartItems = (state) => {
  return state.cart.items.map(item => {
    const product = state.cart.products.find(product => product.id === item.productId);
    return {...item, product};
  })
};*/

export const selectCartItems = (state) => {
  return state.cart.items.map(item => {
    const product = state.cart.products.find(product => product.get('id') === item.get('productId'));
    return item.set('product', product);
  }).toJS()
};
