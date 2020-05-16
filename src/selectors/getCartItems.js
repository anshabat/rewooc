export const getCartItems = (state) => {
  return state.cart.items.map(item => {
    const product = state.cart.products.find(product => product.id === item.productId);
    return {...item, product};
  })
};