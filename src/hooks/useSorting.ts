import { ChangeOrderType, IOrder, ISorting } from 'app-types'
import { useMemo, useState } from 'react'
import { propertyFromDottedString } from '../shared/utilities'

interface IUserSorting {
  sortedOrders: IOrder[]
  sorting: ISorting
  changeOrder: ChangeOrderType
}

export function useSorting(
  orders: IOrder[],
  initialSorting: ISorting
): IUserSorting {
  const [sorting, setSorting] = useState<ISorting>(initialSorting)

  function sortOrders(orders: IOrder[], sorting: ISorting): IOrder[] {
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

  const changeOrder: ChangeOrderType = (orderBy, direction, type) => {
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
