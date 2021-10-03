import { useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { OrderFilterAttributes } from '../components/shop/account/OrdersFilter/OrdersFilter'
import { IFilterChoiceValue } from '../components/shop/account/OrdersList/OrdersList'
import { OrderFilterModule } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'

//interface UseOrdersFilter {}

export function useOrdersFilter(orders: IOrder[]) {
  const initialDeliveries = orders
    .reduce<IDeliveryMethod[]>((prev, order) => {
      const existing = prev.some((i) => i.id === order.deliveryMethod.id)
      return existing ? prev : prev.concat(order.deliveryMethod)
    }, [])
    .map<IFilterChoiceValue>((value, index, array) => {
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
    .map<IFilterChoiceValue>((value, index, array) => {
      return {
        label: value.value,
        value: value.key,
        count: array.length,
      }
    })

  const [deliveries, setDeliveries] = useState<IFilterChoiceValue[]>(
    initialDeliveries
  )
  const [statuses, setStatuses] = useState<IFilterChoiceValue[]>(
    initialStatuses
  )

  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders)

  const filterOrders = (attributes: OrderFilterAttributes): IOrder[] => {
    return new OrderFilterModule(orders)
      .filterByStatus(attributes.status)
      .filterByDelivery(attributes.delivery)
      .getOrders()
  }

  const updateAttribute = (
    key: 'status' | 'delivery',
    attributes: OrderFilterAttributes
  ): IFilterChoiceValue[] => {
    let initialValues: IFilterChoiceValue[]
    switch (key) {
      case 'status':
        initialValues = initialStatuses
        break
      case 'delivery':
        initialValues = initialDeliveries
    }

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

  const applyFilter = (attributes: OrderFilterAttributes) => {
    const newOrders = filterOrders(attributes)
    const newStatuses = updateAttribute('status', attributes)
    const newDeliveries = updateAttribute('delivery', attributes)

    setFilteredOrders(newOrders)
    setStatuses(newStatuses)
    setDeliveries(newDeliveries)
  }

  return {
    filteredOrders,
    deliveries,
    statuses,
    applyFilter,
  }
}
