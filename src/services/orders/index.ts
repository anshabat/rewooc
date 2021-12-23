import { IOrder } from 'app-types'
import { OrderFilterModule } from 'app-services/orders/orderServices'
import { TOrdersFilterAttributes } from 'src/components/shop/account/OrdersList/OrdersList'

export { OrderFilterModule } from './orderServices'
export { FilterChoiceValue, IFilter } from './types'

export const filterOrders = (orders: IOrder[], values: TOrdersFilterAttributes): IOrder[] => {
  return new OrderFilterModule(orders)
    .filterByStatus(values.status)
    .filterByDelivery(values.delivery)
    .getOrders()
}
