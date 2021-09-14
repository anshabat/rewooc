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

const foo = (obj: any, dottedStr: string): any => {
  const properties = dottedStr.split('.')
  return properties.reduce((res, item) => res?.[item], obj)
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
      const aValue = foo(a, orderBy)
      const bValue = foo(b, orderBy)
      let result = a.id - b.id
      switch (orderBy) {
        case 'id':
          result = direction === 'desc' ? bValue - aValue : aValue - bValue
          break
        case 'total':
          result = direction === 'desc' ? bValue - aValue : aValue - bValue
          break
        case 'created.date':
          if (direction === 'desc') {
            result = aValue > bValue ? -1 : 1
          } else {
            result = aValue > bValue ? 1 : -1
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
