export const getCartTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
};
