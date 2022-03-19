import { IDate } from './dateAndTime'
import { IDeliveryMethod } from 'api'

export type OrderStatus = {
  key: string
  value: string
}

export interface IOrder {
  created: IDate
  currency: string
  id: number
  item_count: number
  number: number //string in response
  status: OrderStatus
  total: number //string in response
  url: number
  deliveryMethod: IDeliveryMethod
}
