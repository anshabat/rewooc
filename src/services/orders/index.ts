import { IOrder } from 'app-types'
import { OrderFilterModule } from 'app-services/orders/orderServices'
import { IOrderValues } from 'app-services/orders/types'

export { OrderFilterModule } from './orderServices'
export { FilterChoiceValue, IFilter } from './types'

export const filterOrders = (orders: IOrder[], values: IOrderValues): IOrder[] => {
  return new OrderFilterModule(orders)
    .filterByStatus(values.status)
    .filterByDelivery(values.delivery)
    .getOrders()
}
