export const getCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};