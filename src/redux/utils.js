export const getCartTotalPrice = (products) => {
    return products.reduce((total, product) => {
        return total + product.quantity * product.price;
    }, 0);
};

export const getCartTotalQuantity = (products) => {
    return products.reduce((total, product) => {
        return total + product.quantity;
    }, 0);
};