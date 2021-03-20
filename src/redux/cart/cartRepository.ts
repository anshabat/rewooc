import { ICartItem } from 'app-data'
import { ICartState, INormalizedCartItem } from './cartTypes'
import { IProduct } from 'app-types'

export const normalizeCartItem = (item: ICartItem): INormalizedCartItem => {
  return {
    quantity: item.quantity,
    totalPrice: item.totalPrice,
    key: item.key,
    productId: item.product?.id ?? 0,
  }
}

export const denormalizeCartItem = (
  item: INormalizedCartItem,
  products: IProduct[]
): ICartItem => {
  return {
    key: item.key,
    totalPrice: item.totalPrice,
    quantity: item.quantity,
    product: products.find((product) => product.id === item.productId),
  }
}

export const getCartItems = (cartItems: ICartItem[]): INormalizedCartItem[] => {
  return cartItems.map((item) => normalizeCartItem(item))
}

export const getCartProducts = (cartItems: ICartItem[]): IProduct[] => {
  return cartItems.reduce<IProduct[]>((products, item) => {
    const exist = products.find((p) => p.id === item.product?.id)
    if (!exist && item.product) {
      return products.concat(item.product)
    }

    return products
  }, [])
}

export const addItem = (
  state: ICartState,
  newItem: ICartItem
): INormalizedCartItem[] => {
  const normalizedItem = normalizeCartItem(newItem)
  return state.items.concat(normalizedItem)
}

export const addProduct = (state: ICartState, newItem: ICartItem): IProduct[] => {
  const newProduct = newItem.product
  const products = state.products
  const exist = products.find((product) => product.id === newItem.product?.id)
  if (!exist && newProduct) {
    return products.concat(newProduct)
  }

  return products
}

export const deleteItem = (state: ICartState, key: string): INormalizedCartItem[] => {
  return state.items.filter((item) => item.key !== key)
}

export const deleteProduct = (state: ICartState, key: string): IProduct[] => {
  const products = state.products
  const itemToDelete = state.items.find((item) => item.key === key)

  if (!itemToDelete) {
    return products
  }

  const productId = itemToDelete.productId
  const cartItems = state.items.filter((item) => item.key !== key)
  const exist = cartItems.some((item) => item.productId === productId)

  if (exist) {
    return products
  }

  return products.filter((product) => product.id !== productId)
}

export const changeQuantity = (state: ICartState, newItem: ICartItem): INormalizedCartItem[] => {
  const items = [...state.items]
  const itemIndex = items.findIndex((item) => item.key === newItem.key)
  items[itemIndex].quantity = newItem.quantity
  items[itemIndex].totalPrice = newItem.totalPrice

  return items
}