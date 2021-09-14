import { IOrder } from 'app-types'
import { useState } from 'react'

interface ISorting {
  orderBy: 'total' | 'id' | 'created.date'
  direction: 'asc' | 'desc'
  type: 'string' | 'number'
}

type IUserOrdersSorting = (
  orders: IOrder[],
  initialSorting?: ISorting
) => {
  sortedOrders: IOrder[]
  sorting: ISorting
  changeOrder: (
    orderBy: 'total' | 'id' | 'created.date',
    direction: 'asc' | 'desc',
    type: 'string' | 'number'
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
    type: 'string',
  }
) => {
  const sortOrders = (orders: IOrder[], sorting: ISorting): IOrder[] => {
    const { orderBy, direction, type } = sorting
    const newOrders = [...orders]
    return newOrders.sort((a, b) => {
      const aValue = foo(a, orderBy)
      const bValue = foo(b, orderBy)
      let result = a.id - b.id
      switch (type) {
        case 'number':
          result = direction === 'desc' ? bValue - aValue : aValue - bValue
          break
        case 'string':
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
    direction: 'asc' | 'desc',
    type: 'string' | 'number'
  ): void => {
    setSorting({
      orderBy,
      direction,
      type,
    })
  }

  const sortedOrders = sortOrders(orders, sorting)

  return { sortedOrders, sorting, changeOrder }
}
