import { IOrder } from 'app-types'
import { useState } from 'react'

interface ISorting {
  orderBy: 'total' | 'id' | 'created.date'
  direction: 'asc' | 'desc'
}

type IUserOrdersSorting = (
  orders: IOrder[],
  initialSorting?: ISorting
) => {
  sortedOrders: IOrder[]
  sorting: ISorting
  changeOrder: (
    orderBy: 'total' | 'id' | 'created.date',
    direction: 'asc' | 'desc'
  ) => void
}

export const userOrdersSorting: IUserOrdersSorting = (
  orders,
  initialSorting = {
    orderBy: 'created.date',
    direction: 'asc',
  }
) => {
  const sortOrders = (orders: IOrder[], sorting: ISorting): IOrder[] => {
    const { orderBy, direction } = sorting
    const newOrders = [...orders]
    return newOrders.sort((a, b) => {
      let result = a.id - b.id
      switch (orderBy) {
        case 'id':
          result = direction === 'desc' ? b.id - a.id : a.id - b.id
          break
        case 'total':
          result = direction === 'desc' ? b.total - a.total : a.total - b.total
          break
        case 'created.date':
          if (direction === 'desc') {
            result = a.created.date > b.created.date ? -1 : 1
          } else {
            result = a.created.date > b.created.date ? 1 : -1
          }
          break
      }
      return result
    })
  }

  const [sorting, setSorting] = useState<ISorting>(initialSorting)

  const changeOrder = (
    orderBy: 'total' | 'id' | 'created.date',
    direction: 'asc' | 'desc'
  ): void => {
    setSorting({
      orderBy,
      direction,
    })
  }

  const sortedOrders = sortOrders(orders, sorting)

  return { sortedOrders, sorting, changeOrder }
}
