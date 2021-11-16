import { useEffect, useState, MouseEvent } from 'react'
import { IOrder, OrderStatus } from 'app-types'
import { FilterChoiceValue, OrderFilterModule } from 'app-services/orders'
import { IDeliveryMethod } from 'app-api'
import { useQuery } from 'app-services/query'

interface IOrderValues {
  status: string[]
  delivery: string[]
}

interface IOrderAttributes {
  delivery: FilterChoiceValue[]
  status: FilterChoiceValue[]
}

interface IUseOrdersProps {
  orders: IOrder[]
  attributes: IOrderAttributes
  values: IOrderValues
  updateValues: (newValues: Partial<IOrderValues>) => void
  clearFilter: (e: MouseEvent<HTMLButtonElement>) => void
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

const filterOrders = (orders: IOrder[], values: IOrderValues): IOrder[] => {
  return new OrderFilterModule(orders)
    .filterByStatus(values.status)
    .filterByDelivery(values.delivery)
    .getOrders()
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

const getValuesArrayFromQueryParams = (key: string, params: any): any => {
  if (!params[key]) {
    return []
  }
  return Array.isArray(params[key]) ? params[key] : [params[key]]
}

export function useOrdersFilter(initialOrders: IOrder[]): IUseOrdersProps {
  /*const initialValues: IOrderValues = {
    status: [],
    delivery: [],
  }*/
  const initialAttributes: IOrderAttributes = {
    delivery: getDeliveryAttribute(initialOrders),
    status: getStatusAttribute(initialOrders),
  }
  const { params, updateParams } = useQuery()
  const initialValues = {
    status: [...getValuesArrayFromQueryParams('status', params)],
    delivery: [...getValuesArrayFromQueryParams('delivery', params)],
  }
  //TODO get initialValues from params
  const [values, setValues] = useState(initialValues)
  const [orders, setOrders] = useState<IOrder[]>(filterOrders(initialOrders, initialValues))
  const [attributes, setAttributes] = useState(initialAttributes)

  useEffect(() => {
    applyFilter(values)
  }, [values])

  useEffect(() => {
    setValues({
      status: [...getValuesArrayFromQueryParams('status', params)],
      delivery: [...getValuesArrayFromQueryParams('delivery', params)],
    })
  }, [params])

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

  const applyFilter = (newValues: IOrderValues) => {
    const newOrders = filterOrders(initialOrders, newValues)
    const newAttributes: IOrderAttributes = {
      status: updateAttributeValuesCount('status', newValues),
      delivery: updateAttributeValuesCount('delivery', newValues),
    }
    setOrders(newOrders)
    setAttributes(newAttributes)
  }

  const updateValues = (attributeValues: Partial<IOrderValues>) => {
    updateParams(attributeValues)
    setValues((prev) => ({ ...prev, ...attributeValues }))
  }

  const clearFilter = () => {
    updateValues(initialValues)
  }

  return {
    orders,
    attributes,
    values,
    updateValues,
    clearFilter,
  }
}
