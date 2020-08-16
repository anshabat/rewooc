export const selectCartTotalPrice = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.get('totalPrice');
  }, 0);
};
