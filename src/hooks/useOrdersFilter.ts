import { useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { FilterChoiceValue, OrderFilterModule } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'
import { IOrderValues } from '../components/shop/account/OrdersFilter/OrdersFilter'

export function useOrdersFilter(orders: IOrder[]) {
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

  const filterOrders = (values: IOrderValues): IOrder[] => {
    return new OrderFilterModule(orders)
      .filterByStatus(values.status)
      .filterByDelivery(values.delivery)
      .getOrders()
  }

  // TODO refactor, only return new count
  const updateChoiceValueLength = (
    key: 'status' | 'delivery',
    values: IOrderValues
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
      const statuses = [...values[key], option.value]
      const filteredOrders = filterOrders({
        ...values,
        [key]: statuses,
      })
      return {
        value: option.value,
        label: option.label,
        count: filteredOrders.length,
      }
    })
  }

  const applyFilter = (values: IOrderValues) => {
    const newOrders = filterOrders(values)
    const newStatuses = updateChoiceValueLength('status', values)
    const newDeliveries = updateChoiceValueLength('delivery', values)

    setFilteredOrders(newOrders)
    setStatuses(newStatuses)
    setDeliveries(newDeliveries)
  }

  const attributes = {
    delivery: deliveries,
    status: statuses,
  }

  return {
    filteredOrders,
    attributes,
    applyFilter,
  }
}
