import { ICartItem } from 'api'
import { getProductsMock } from './productsMock'

const products = getProductsMock()

export const cartItems: ICartItem[] = [
  {
    key: '1',
    quantity: 1,
    totalPrice: 100,
    product: products[0],
  },
  {
    key: '2',
    quantity: 3,
    totalPrice: 600,
    product: products[1],
  },
]

export function getCartItemsMocks(): ICartItem[] {
  return [...cartItems]
}
