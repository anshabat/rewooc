import { TBasicFilterAttributes } from './../../services/filter/types';
import {
  Filter,
  TFilterChoiseAttribute,
  TFilterTextAttribute,
  TFilterValues,
  TFilterRangeAttribute,
  getAttributeValue,
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

export function getValuesFromAttributes<T extends string>(
  attributes: TBasicFilterAttributes[]
): TFilterValues<T> {
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
        checked: attr.checked,
      }
    })
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
      options: statusOptions,
    },
    {
      key: 'delivery',
      label: 'Delivery',
      type: 'choice',
      options: deliveryOptions,
    },
    {
      key: 'id',
      label: 'Number',
      type: 'text',
      value: '',
    },
    {
      key: 'price',
      label: 'Price',
      type: 'range',
      max: '',
      min: '',
    },
  ]

  const attributes = updateAttributes(idleAttributes, getValuesFromAttributes(idleAttributes), orders)

  return attributes
}

const updateAttributes = (
  attributes: TOrderFilterAttribute[],
  newValues: TOrderFilterValues,
  orders: IOrder[],
): TOrderFilterAttribute[] => {
  return attributes.map<TOrderFilterAttribute>((attr) => {
    const { key, type } = attr

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

        return { ...attr, options }
      }
      case 'text': {
        return { ...attr, value: newValues.id[0] }
      }
      case 'range': {
        return { ...attr, min: newValues.price[0], max: newValues.price[1] }
      }
      default:
        return attr
    }
  })
}

export { filterOrders, getAttributes, updateAttributes }
