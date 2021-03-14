import { Map } from "immutable";

export interface IProduct {
  addToCartUrl: string
  getStockQuantity: null | number
  id: number
  images: any
  isSoldIndividually: boolean
  link: string
  price: number
  title: string
}

export type ImmutableProductType = IProduct & Map<string, any>