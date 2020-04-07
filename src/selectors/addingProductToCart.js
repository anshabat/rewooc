export const addingProductToCart = (state, productId) => {
  return state.cart.addingProductId === productId
};