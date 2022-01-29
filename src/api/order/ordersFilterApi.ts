import { Filter, FilterChoiceValue, TFilterChoiseAttribute } from 'app-services/filter'
import { IOrder } from 'app-types'

type TValues = { [key: string]: string[] }

export const filterOrders = (orders: IOrder[], values: any): IOrder[] => {
  return new Filter(orders)
    .by('status.key', values.status)
    .by('deliveryMethod.id', values.delivery)
    .getItems()
}

const getAttributeFromOrders = function (
  orders: any[],
  attributeName: keyof IOrder,
  cb: (arg: any) => FilterChoiceValue
): FilterChoiceValue[] {
  return orders
    .map((order) => {
      return { ...order, [attributeName]: cb(order[attributeName]) }
    })
    .reduce<any[]>((prev, order) => {
      const existing = prev.some((i) => i.value === order[attributeName].value)
      return existing ? prev : prev.concat(order[attributeName])
    }, [])
    .map<FilterChoiceValue>((attr) => {
      return {
        label: attr.label,
        value: String(attr.value),
      }
    })
}

const mergeValues = (
  currentValues: TValues,
  newValue: Record<string, string>
) => {
  // TODO change Record<string, string> to smth like Record<keyof TOrdersFilterAttributes, string>
  const values = { ...currentValues }
  const key = Object.keys(newValue)[0] as keyof TValues
  values[key] = [...values[key], newValue[key]]
  return values
}

function calculateOptionsCount(
  key: string,
  options: FilterChoiceValue[],
  orders: IOrder[],
  initialValues: TValues
): FilterChoiceValue[] {
  return options.map((option) => {
    const vals = mergeValues(initialValues, { [key]: option.value })
    const filteredOrders = filterOrders(orders, vals)
    return { ...option, count: filteredOrders.length }
  })
}

const isAttributeAppliedSelector = function (key: string, values: TValues) {
  return values[key] ? Boolean(values[key].length) : false
}

export function getAttributes(orders: IOrder[]): TFilterChoiseAttribute[] {
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
  ]
}

export const updateAttributes = (
  values: TValues,
  orders: IOrder[],
  attributes: TFilterChoiseAttribute[]
): TFilterChoiseAttribute[] => {
  return [
    {
      key: 'status',
      label: 'Status',
      type: 'choice',
      isApplied: isAttributeAppliedSelector('status', values),
      options: calculateOptionsCount(
        'status',
        attributes[0].options,
        orders,
        values
      ),
    },
    {
      key: 'delivery',
      label: 'Delivery',
      type: 'choice',
      isApplied: isAttributeAppliedSelector('delivery', values),
      options: calculateOptionsCount(
        'delivery',
        attributes[1].options,
        orders,
        values
      ),
    },
  ]
}
