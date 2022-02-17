import {
  Filter,
  TFilterChoiseAttribute,
  TFilterTextAttribute,
  TFilterValues,
  TFilterRangeAttribute,
} from 'app-services/filter'
import { TChoiceField } from 'app-services/form'
import { IOrder } from 'app-types'

export type TOrderFilterValues = TFilterValues<
  'delivery' | 'status' | 'id' | 'price'
>

export type TOrderFilterAttribute =
  | TFilterChoiseAttribute<'delivery' | 'status'>
  | TFilterTextAttribute<'id'>
  | TFilterRangeAttribute<'price'>

function getAttributeValue(attr: TOrderFilterAttribute): string[] {
  switch (attr.type) {
    case 'choice':
      return attr.options.filter((o) => o.checked).map((o) => o.value)
    case 'range':
      return [attr.min, attr.max]
    case 'text':
      return attr.value ? [attr.value] : []
  }
}

export function getValuesFromAttributes(
  attributes: TOrderFilterAttribute[]
): TOrderFilterValues {
  const attrs = attributes.map((attr) => [[attr.key], getAttributeValue(attr)])

  return Object.fromEntries(attrs)
}

const filterOrders = (
  orders: IOrder[],
  values: TOrderFilterValues
): IOrder[] => {
  const { status, delivery, id, price } = values

  return new Filter(orders)
    .equal('status.key', status)
    .equal('deliveryMethod.id', delivery)
    .equal('number', id)
    .range('total', price[0], price[1])
    .getItems()
}

const getAttributeOptionsFromOrders = function (
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
        checked: false,
      }
    })
}

const isAttributeAppliedSelector = function (
  key: keyof TOrderFilterValues,
  values: TOrderFilterValues
) {
  return values[key] ? Boolean(values[key].length) : false
}

function getAttributes(orders: IOrder[]): TOrderFilterAttribute[] {
  const deliveryOptions = getAttributeOptionsFromOrders(
    orders,
    'deliveryMethod',
    (delivery) => {
      return { value: delivery.id, label: delivery.title, checked: false }
    }
  )
  const statusOptions = getAttributeOptionsFromOrders(orders, 'status', (status) => {
    return { value: status.key, label: status.value, checked: false }
  })

  const idleAttributes: TOrderFilterAttribute[] = [
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
    {
      key: 'price',
      label: 'Price',
      type: 'range',
      isApplied: false,
      max: '',
      min: '',
    },
  ]

  return updateAttributes(idleAttributes, getValuesFromAttributes(idleAttributes), orders)
}

const updateAttributes = (
  attributes: TOrderFilterAttribute[],
  newValues: TOrderFilterValues,
  orders: IOrder[],
): TOrderFilterAttribute[] => {
  return attributes.map<TOrderFilterAttribute>((attr) => {
    const { key, type } = attr
    const newAttr = {
      ...attr,
      isApplied: isAttributeAppliedSelector(key, newValues),
    }

    switch (type) {
      case 'choice': {
        const options = attr.options.map((option) => {
          const mergedValues = {
            ...newValues,
            [key]: Array.from(new Set([...newValues[key], option.value])),
          }
          const count = filterOrders(orders, mergedValues).length
          const checked = newValues[key].includes(option.value)

          return { ...option, count, checked }
        })

        return { ...newAttr, options }
      }
      case 'text': {
        return { ...newAttr, value: newValues.id[0] }
      }
      case 'range': {
        return { ...newAttr, min: newValues.price[0], max: newValues.price[1] }
      }
      default:
        return newAttr
    }
  })
}

export { filterOrders, getAttributes, updateAttributes }
