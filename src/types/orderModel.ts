import { IDate } from './dateAndTime'
import { IDeliveryMethod } from 'app-api'

export interface IOrder {
  created: IDate
  currency: string
  id: number
  item_count: number
  number: number //string in response
  status: {
    key: string
    value: string
  }
  total: number //string in response
  url: number
  deliveryMethod: IDeliveryMethod
}
