import { IDate } from './dateAndTime'

export interface IOrder {
  created: IDate
  currency: string
  id: number
  item_count: number
  number: number //string in response
  status: string
  total: number //string in response
  url: number
}
