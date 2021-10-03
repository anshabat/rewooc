import { useState } from 'react'
import { IOrder } from 'app-types'
import { OrderFilterAttributes } from '../components/shop/account/OrdersFilter/OrdersFilter'
import { IFilterChoiceValue } from '../components/shop/account/OrdersList/OrdersList'
import { OrderFilterModule } from 'app-services/orders'

//interface UseOrdersFilter {}

export function useOrdersFilter(orders: IOrder[]) {
  const filterOrders = (attributes: OrderFilterAttributes): IOrder[] => {
    return new OrderFilterModule(orders)
      .filterByStatus(attributes.status)
      .filterByDelivery(attributes.delivery)
      .getOrders()
  }

  const updateAttribute = (
    key: 'status' | 'delivery',
    initialValues: IFilterChoiceValue[],
    attributes: OrderFilterAttributes
  ) => {
    return initialValues.map((option) => {
      const statuses = [...attributes[key], option.value]
      const filteredOrders = filterOrders({
        ...attributes,
        [key]: statuses,
      })
      return {
        value: option.value,
        label: option.label,
        count: filteredOrders.length,
      }
    })
  }
  return {
    filterOrders,
    updateAttribute,
  }
}
