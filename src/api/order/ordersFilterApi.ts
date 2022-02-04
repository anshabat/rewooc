import {
  Filter,
  TFilterChoiseAttribute,
  TFilterTextAttribute,
  TFilterValues,
} from 'app-services/filter'
import { TChoiceField } from 'app-services/form'
import { IOrder } from 'app-types'

export type TOrderFilterValues = TFilterValues<'delivery' | 'status' | 'id'>

export type TOrderFilterAttribute =
  | TFilterChoiseAttribute<'delivery' | 'status'>
  | TFilterTextAttribute<'id'>

const filterOrders = (
  orders: IOrder[],
  values: TOrderFilterValues
): IOrder[] => {
  return new Filter(orders)
    .by('status.key', values.status)
    .by('deliveryMethod.id', values.delivery)
    .getItems()
}

const getAttributeFromOrders = function (
  orders: any[],
  attributeName: keyof IOrder,
  cb: (arg: any) => TChoiceField
): TChoiceField[] {
  return orders
    .map((order) => {
      return { ...order, [attributeName]: cb(order[attributeName]) }
    })
    .reduce<any[]>((prev, order) => {
      const existing = prev.some((i) => i.value === order[attributeName].value)
      return existing ? prev : prev.concat(order[attributeName])
    }, [])
    .map<TChoiceField>((attr) => {
      return {
        label: attr.label,
        value: String(attr.value),
      }
    })
}

const mergeValues = (
  currentValues: TOrderFilterValues,
  newValue: Record<string, string>
) => {
  // TODO change Record<string, string> to smth like Record<keyof TOrdersFilterAttributes, string>
  const values = { ...currentValues }
  const key = Object.keys(newValue)[0] as keyof TOrderFilterValues
  values[key] = [...values[key], newValue[key]]
  return values
}

function calculateOptionsCount(
  key: string,
  options: TChoiceField[],
  orders: IOrder[],
  initialValues: TOrderFilterValues
): TChoiceField[] {
  return options.map((option) => {
    const vals = mergeValues(initialValues, { [key]: option.value })
    const filteredOrders = filterOrders(orders, vals)
    return { ...option, count: filteredOrders.length }
  })
}

const isAttributeAppliedSelector = function (
  key: keyof TOrderFilterValues,
  values: TOrderFilterValues
) {
  return values[key] ? Boolean(values[key].length) : false
}

function getAttributes(orders: IOrder[]): TOrderFilterAttribute[] {
  const deliveryOptions = getAttributeFromOrders(
    orders,
    'deliveryMethod',
    (delivery) => {
      return { value: delivery.id, label: delivery.title }
    }
  )
  const statusOptions = getAttributeFromOrders(orders, 'status', (status) => {
    return { value: status.key, label: status.value }
  })

  return [
    {
      key: 'status',
      label: 'Status',
      type: 'choice',
      isApplied: false,
      options: statusOptions,
    },
    {
      key: 'delivery',
      label: 'Delivery',
      type: 'choice',
      isApplied: false,
      options: deliveryOptions,
    },
    {
      key: 'id',
      label: 'Number',
      type: 'text',
      isApplied: false,
      value: '',
    },
  ]
}

const updateAttributes = (
  values: TOrderFilterValues,
  orders: IOrder[],
  attributes: TOrderFilterAttribute[]
): TOrderFilterAttribute[] => {
  return attributes.map<TOrderFilterAttribute>((attr) => {
    const { key, type } = attr
    const newAttr = {
      ...attr,
      isApplied: isAttributeAppliedSelector(key, values),
    }
    
    switch (type) {
      case 'choice': {
        console.log('choice', values);
        
        return {
          ...attr,
          options: calculateOptionsCount(key, attr.options, orders, values),
          a: 1
        }
      }
      case 'text': {
        console.log('text', values);
        return {
          ...attr,
          value: values.id[0],
        }
      }
      default:
        return newAttr
    }
  })
}

export { filterOrders, getAttributes, updateAttributes }
