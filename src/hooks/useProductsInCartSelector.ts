import { useSelector } from 'react-redux'
import {
  selectAddingToCartId,
  selectCartItems,
} from '../redux/cart/cartSelectors'

export function useProductsInCartSelector(): {
  cartItemsIds: number[]
  addingToCartId: number
} {
  const cartItems = useSelector(selectCartItems)
  const cartItemsIds = cartItems.map((item) => item.product.id)
  const addingToCartId = Number(useSelector(selectAddingToCartId))

  return {
    cartItemsIds,
    addingToCartId,
  }
}
