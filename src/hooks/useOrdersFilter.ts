import { useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { ISelectedAttributes } from '../components/shop/account/OrdersFilter/OrdersFilter'
import { FilterChoiceValue, OrderFilterModule } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'

//interface UseOrdersFilter {}

export function useOrdersFilter<T>(orders: IOrder[]) {
  const initialDeliveries = orders
    .reduce<IDeliveryMethod[]>((prev, order) => {
      const existing = prev.some((i) => i.id === order.deliveryMethod.id)
      return existing ? prev : prev.concat(order.deliveryMethod)
    }, [])
    .map<FilterChoiceValue>((value, index, array) => {
      return {
        label: value.title,
        value: String(value.id),
        count: array.length,
      }
    })

  const initialStatuses = orders
    .reduce<OrderStatus[]>((prev, order) => {
      const existing = prev.some((i) => i.key === order.status.key)
      return existing ? prev : prev.concat(order.status)
    }, [])
    .map<FilterChoiceValue>((value, index, array) => {
      return {
        label: value.value,
        value: value.key,
        count: array.length,
      }
    })

  const [deliveries, setDeliveries] = useState<FilterChoiceValue[]>(
    initialDeliveries
  )
  const [statuses, setStatuses] = useState<FilterChoiceValue[]>(initialStatuses)

  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders)

  const filterOrders = (attributes: T): IOrder[] => {

    return new OrderFilterModule(orders)
      // @ts-ignore TODO fix
      .filterByStatus(attributes.status)
      // @ts-ignore TODO fix
      .filterByDelivery(attributes.delivery)
      .getOrders()
  }

  const updateAttribute = (
    key: 'status' | 'delivery',
    attributes: T
  ): FilterChoiceValue[] => {
    let initialValues: FilterChoiceValue[]
    switch (key) {
      case 'status':
        initialValues = initialStatuses
        break
      case 'delivery':
        initialValues = initialDeliveries
    }

    return initialValues.map((option) => {
      // @ts-ignore TODO fix
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

  const applyFilter = (attributes: T) => {
    const newOrders = filterOrders(attributes)
    const newStatuses = updateAttribute('status', attributes)
    const newDeliveries = updateAttribute('delivery', attributes)

    setFilteredOrders(newOrders)
    setStatuses(newStatuses)
    setDeliveries(newDeliveries)
  }

  const updatedAttributes = {
    delivery: deliveries,
    status: statuses,
  }

  return {
    filteredOrders,
    updatedAttributes,
    applyFilter,
  }
}
