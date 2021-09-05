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

export function useCartInfo(
  productId: number
): {
  isProductInCart: boolean
  isProductAddingToCart: boolean
} {
  const cartItems = useSelector(selectCartItems)
  const isProductInCart = cartItems.some(
    (item) => item.product?.id === productId
  )

  const addingToCartId = useSelector(selectAddingToCartId)
  const isProductAddingToCart = addingToCartId === productId

  return {
    isProductInCart,
    isProductAddingToCart,
  }
}
