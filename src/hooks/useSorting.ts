import { IOrder } from 'app-types'
import { useMemo, useState } from 'react'
import { propertyFromDottedString } from '../shared/utilities'

interface ISorting<T> {
  orderBy: T
  direction: 'asc' | 'desc'
  type: 'string' | 'number'
}

type ChangeOrder<T> = (
  orderBy: T,
  direction: 'asc' | 'desc',
  type: 'string' | 'number'
) => void

interface IUserSorting<T> {
  sortedOrders: IOrder[]
  sorting: ISorting<T>
  changeOrder: ChangeOrder<T>
}

export function useSorting<T>(
  orders: IOrder[],
  initialSorting: ISorting<T>
): IUserSorting<T> {
  const [sorting, setSorting] = useState<ISorting<T>>(initialSorting)

  function sortOrders(orders: IOrder[], sorting: ISorting<T>): IOrder[] {
    console.log('sort hook')
    const { orderBy, direction, type } = sorting
    const newOrders = [...orders]
    return newOrders.sort((a, b) => {
      const aValue = propertyFromDottedString(a, String(orderBy))
      const bValue = propertyFromDottedString(b, String(orderBy))
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

  const changeOrder: ChangeOrder<T> = (orderBy, direction, type) => {
    setSorting({
      orderBy,
      direction,
      type,
    })
  }

  const sortedOrders = useMemo(() => {
    return sortOrders(orders, sorting)
  }, [orders, sorting])

  return { sortedOrders, sorting, changeOrder }
}
