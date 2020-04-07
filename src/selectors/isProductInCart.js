export const isProductInCart = (state, productId) => {
  return state.cart.items.some(item => item.productId === productId);
};