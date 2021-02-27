import { ICartItem, ICartHash } from '../cart/cartTypes'

export interface IGeneralResponseData {
  ajaxUrl: string
  baseUrl: string
  cart: ICartHash
  favicon: string
  headerNavigation: Array<any>
  logo: any
  phone: string
  price: any
  siteMeta: {
    title: string
    description: string
    charset: string
  }
  user: any
}

export interface IGeneralData extends Omit<IGeneralResponseData, 'cart'> {
  cart: ICartItem[]
}
