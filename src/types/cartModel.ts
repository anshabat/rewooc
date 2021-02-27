import { IProduct } from './Product'

// TODO reduce number of properties similar to ICartItem in redux types
export interface ICartItemResponse {
  data: IProduct
  data_hash: string
  key: string
  line_subtotal: number
  line_subtotal_tax: number
  line_tax: number
  line_tax_data: {
    subtotal: any
    total: any
  }
  line_total: number
  product_id: number
  quantity: number
  variation: Array<any>
  variation_id: number
}

export interface ICartItem {
  key: string
  productId: number
  quantity: number
  totalPrice: number
  product: IProduct
}

export interface ICartHash {
  [key: string]: ICartItemResponse
}
