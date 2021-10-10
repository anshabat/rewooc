import { useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { FilterChoiceValue, OrderFilterModule } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'
import { IOrderValues } from '../components/shop/account/OrdersFilter/OrdersFilter'

const getStatusAttribute = (orders: IOrder[]) => {
  return orders
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
}

const getDeliveryAttribute = (orders: IOrder[]) => {
  return orders
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
}

interface IOrderAttributes {
  delivery: FilterChoiceValue[]
  status: FilterChoiceValue[]
}

export function useOrdersFilter(orders: IOrder[]) {
  const initialAttributes: IOrderAttributes = {
    delivery: getDeliveryAttribute(orders),
    status: getStatusAttribute(orders),
  }
  const [attributes, setAttributes] = useState(initialAttributes)
  const [filteredOrders, setFilteredOrders] = useState<IOrder[]>(orders)

  const filterOrders = (values: IOrderValues): IOrder[] => {
    return new OrderFilterModule(orders)
      .filterByStatus(values.status)
      .filterByDelivery(values.delivery)
      .getOrders()
  }

  const updateAttributeValuesCount = (
    key: keyof IOrderAttributes,
    values: IOrderValues
  ): FilterChoiceValue[] => {
    return initialAttributes[key].map((attr) => {
      const nextValues = [...values[key], attr.value]
      const filteredOrders = filterOrders({
        ...values,
        [key]: nextValues,
      })
      return {
        value: attr.value,
        label: attr.label,
        count: filteredOrders.length,
      }
    })
  }

  const applyFilter = (values: IOrderValues) => {
    const newOrders = filterOrders(values)
    const newAttributes: IOrderAttributes = {
      status: updateAttributeValuesCount('status', values),
      delivery: updateAttributeValuesCount('delivery', values),
    }

    setFilteredOrders(newOrders)
    setAttributes(newAttributes)
  }

  return {
    filteredOrders,
    attributes,
    applyFilter,
  }
}
