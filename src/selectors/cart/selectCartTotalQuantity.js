export const selectCartTotalQuantity = (state) => {
  return state.cart.items.reduce((total, item) => {
    return total + item.get('quantity');
  }, 0);
};