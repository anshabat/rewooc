export const getCartTotalPrice = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.totalPrice;
  }, 0);
};

export const getCartTotalQuantity = (cartItems) => {
  return cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);
};

export const isProductInCart = (id, cartItems) => {
  return cartItems.some(item => item.productId === id);
};

export const cartItemAdapter = (item) => {
  return {
    key: item.key,
    productId: item.product_id,
    quantity: item.quantity,
    totalPrice: item.line_total,
    products: item.data
  }
};