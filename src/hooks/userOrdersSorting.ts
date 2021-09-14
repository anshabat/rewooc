import { IOrder } from 'app-types'
import { useState } from 'react'
import { propertyFromDottedString } from '../shared/utilities'

interface ISorting {
  orderBy: 'total' | 'id' | 'created.date'
  direction: 'asc' | 'desc'
  type: 'string' | 'number'
}

type ChangeOrder = (
  orderBy: 'total' | 'id' | 'created.date',
  direction: 'asc' | 'desc',
  type: 'string' | 'number'
) => void

type IUserOrdersSorting = (
  orders: IOrder[],
  initialSorting?: ISorting
) => {
  sortedOrders: IOrder[]
  sorting: ISorting
  changeOrder: ChangeOrder
}

export const userOrdersSorting: IUserOrdersSorting = (
  orders,
  initialSorting = {
    orderBy: 'created.date',
    direction: 'asc',
    type: 'string',
  }
) => {
  const sortOrders = (orders: IOrder[], sorting: ISorting): IOrder[] => {
    const { orderBy, direction, type } = sorting
    const newOrders = [...orders]
    return newOrders.sort((a, b) => {
      const aValue = propertyFromDottedString(a, orderBy)
      const bValue = propertyFromDottedString(b, orderBy)
      switch (type) {
        case 'string':
          if (direction === 'desc') {
            return aValue > bValue ? -1 : 1
          } else {
            return aValue > bValue ? 1 : -1
          }
        case 'number':
        default:
          return direction === 'desc' ? bValue - aValue : aValue - bValue
      }
    })
  }

  const [sorting, setSorting] = useState<ISorting>(initialSorting)

  const changeOrder: ChangeOrder = (orderBy, direction, type) => {
    setSorting({
      orderBy,
      direction,
      type,
    })
  }

  const sortedOrders = sortOrders(orders, sorting)

  return { sortedOrders, sorting, changeOrder }
}
