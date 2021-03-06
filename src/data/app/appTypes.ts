import { ICartItem, ICartHash } from '../cart/cartTypes'
import { INavItem } from '../../types/navigationModel'

export interface IGeneralResponseData {
  ajaxUrl: string
  baseUrl: string
  cart: ICartHash
  favicon: string
  headerNavigation: INavItem[]
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
