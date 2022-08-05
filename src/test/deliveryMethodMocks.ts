import { IDeliveryMethod } from 'api'

export const orders: IDeliveryMethod[] = [
  {
    id: 'id_1',
    title: 'Delivery_1',
    cost: 0,
    order: 1,
    enabled: 'yes',
  },
  {
    id: 'id_2',
    title: 'Delivery_2',
    cost: 10,
    order: 1,
    enabled: 'yes',
  },
  {
    id: 'id_3',
    title: 'Delivery_3',
    cost: 100,
    order: 1,
    enabled: 'yes',
  },
]

export function getDeliveryMethodMock(
  newMethods: IDeliveryMethod[] = []
): IDeliveryMethod[] {
  return [...orders].concat(newMethods)
}
