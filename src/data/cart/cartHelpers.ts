import { ICartHash, ICartItem, ICartItemResponse } from './cartTypes'

export function cartItemFacade(originItems: ICartItemResponse): ICartItem {
  return {
    quantity: originItems.quantity,
    key: originItems.key,
    productId: originItems.product_id,
    totalPrice: originItems.line_total,
    product: originItems.data,
  }
}

export function cartHashToItems(hash: ICartHash): ICartItem[] {
  const responseItems = Object.values(hash)
  return responseItems.map((item) => cartItemFacade(item))
}