import { ICartItemResponse } from 'app-types'

export interface ICartPage {
  title: string
}

export interface IAddToCart {
  success: boolean
  data?: ICartItemResponse
}

export interface IDeleteProductFromCart {
  success: boolean
}
