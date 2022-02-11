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

function getValuesFromAttributes(attributes: TOrderFilterAttribute[]): TOrderFilterValues {
  const attrs = attributes.map((attr) => {
    const { key, type } = attr
    let value: string[]
    switch (type) {
      case 'choice':
        value = attr.options.filter((o) => o.checked).map((o) => o.value)
        break
      case 'range':
        value = [attr.min, attr.max]
        break
      case 'text':
        value = attr.value ? [attr.value] : []
    }

    return [[key], value]
  })
  
  return Object.fromEntries(attrs)
}

const filterOrders = (
  orders: IOrder[],
  attributes: TOrderFilterAttribute[]
): IOrder[] => {
  const values = getValuesFromAttributes(attributes)

  return new Filter(orders)
    .equal('status.key', values.status)
    .equal('deliveryMethod.id', values.delivery)
    .equal('number', values.id)
    .range('total', values.price[0], values.price[1])
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
        checked: false,
      }
    })
}

// const mergeValues = (
//   currentValues: TOrderFilterValues,
//   newValue: Record<string, string>
// ) => {
//   // TODO change Record<string, string> to smth like Record<keyof TOrdersFilterAttributes, string>
//   const values = { ...currentValues }
//   const key = Object.keys(newValue)[0] as keyof TOrderFilterValues
//   values[key] = [...values[key], newValue[key]]
//   return values
// }

// function calculateOptionsCount(
//   key: string,
//   options: TChoiceField[],
//   orders: IOrder[],
//   initialValues: TOrderFilterValues
// ): TChoiceField[] {
//   return options.map((option) => {
//     const checked = initialValues[key as keyof TOrderFilterValues].includes(option.value)
//     const vals = mergeValues(initialValues, { [key]: option.value })
//     const filteredOrders = filterOrders(orders, vals)
//     return { ...option, count: filteredOrders.length, checked }
//   })
// }

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
      return { value: delivery.id, label: delivery.title, checked: false }
    }
  )
  const statusOptions = getAttributeFromOrders(orders, 'status', (status) => {
    return { value: status.key, label: status.value, checked: false }
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
    {
      key: 'price',
      label: 'Price',
      type: 'range',
      isApplied: false,
      max: '',
      min: '',
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
        const options = attr.options.map((option) => {
          return { ...option, checked: values[key].includes(option.value) }
        })

        return { ...newAttr, options }
      }
      case 'text': {
        return { ...newAttr, value: values.id[0] }
      }
      case 'range': {
        return { ...newAttr, min: values.price[0], max: values.price[1] }
      }
      default:
        return newAttr
    }
  })
}

export { filterOrders, getAttributes, updateAttributes }
