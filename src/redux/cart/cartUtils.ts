import { ICartItem } from 'api'
import { ICartData, ICartState, INormalizedCartItem } from './cartTypes'
import { IProduct } from 'types'

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
    product: products.find((product) => product.id === item.productId)!,
  }
}

export const createData = (cartItems: ICartItem[]): ICartData => {
  const items = cartItems.map((item) => normalizeCartItem(item))
  const products = cartItems.reduce<IProduct[]>((products, item) => {
    const exist = products.find((p) => p.id === item.product?.id)
    if (!exist && item.product) {
      return products.concat(item.product)
    }

    return products
  }, [])

  return { items, products }
}

export const addData = (state: ICartState, newItem: ICartItem): ICartData => {
  const normalizedItem = normalizeCartItem(newItem)
  const items = state.items.concat(normalizedItem)

  const newProduct = newItem.product
  const products = [...state.products]
  const exist = products.find((product) => product.id === newItem.product?.id)
  if (!exist && newProduct) {
    products.push(newProduct)
  }

  return { items, products }
}

export const deleteData = (state: ICartState, key: string): ICartData => {
  const items = state.items.filter((item) => item.key !== key)
  const products = state.products.filter((product) =>
    items.find((i) => i.productId === product.id)
  )
  return { items, products }
}

export const updateItemQuantity = (
  items: INormalizedCartItem[],
  newItem: ICartItem
): void => {
  const index = items.findIndex((item) => item.key === newItem.key)
  if (index !== -1) {
    items[index].quantity = newItem.quantity
    items[index].totalPrice = newItem.totalPrice
  }
}
