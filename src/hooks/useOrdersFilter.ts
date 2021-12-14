import { useEffect, useState } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { FilterChoiceValue, filterOrders } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'
import { IOrderValues } from 'app-services/orders/types'

interface IOrderAttributes {
  delivery: FilterChoiceValue[]
  status: FilterChoiceValue[]
}

// TODO move to helpers after folder structure change to modules
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

export function useOrdersFilter(initialOrders: IOrder[], values: IOrderValues): IOrderAttributes {
  const initialAttributes: IOrderAttributes = {
    delivery: getDeliveryAttribute(initialOrders),
    status: getStatusAttribute(initialOrders),
  }

  const [attributes, setAttributes] = useState(initialAttributes)

  useEffect(() => {
    updateAttributes(values)
  }, [values])

  const updateAttributeValuesCount = (
    key: keyof IOrderAttributes,
    values: IOrderValues
  ): FilterChoiceValue[] => {
    return initialAttributes[key].map((attr) => {
      const nextValues = [...values[key], attr.value]
      const filteredOrders = filterOrders(initialOrders, {
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

  const updateAttributes = (newValues: IOrderValues) => {
    const newAttributes: IOrderAttributes = {
      status: updateAttributeValuesCount('status', newValues),
      delivery: updateAttributeValuesCount('delivery', newValues),
    }
    setAttributes(newAttributes)
  }

  return attributes
}
