import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter, {
  OrderFilterAttributes,
} from '../OrdersFilter/OrdersFilter'
import { IDeliveryMethod } from 'app-api'

interface OrdersListProps {
  orders: IOrder[]
}

class OrderFilterModule {
  constructor(public orders: IOrder[]) {}

  filterByStatus(status: string[]): this {
    if (status.length) {
      this.orders = this.orders.filter((order) => status.includes(order.status.key))
    }
    return this
  }

  filterByDelivery(delivery: string[]): this {
    if (delivery.length) {
      this.orders = this.orders.filter((order) =>
        delivery.includes(String(order.deliveryMethod.id))
      )
    }
    return this
  }
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const onFilterHandler = (attributes: OrderFilterAttributes) => {
    const filter = new OrderFilterModule(orders)
      .filterByStatus(attributes.status)
      .filterByDelivery(attributes.delivery)
    setFilteredOrders(filter.orders)
  }

  const deliveryValues = orders.reduce<IDeliveryMethod[]>((prev, order) => {
    const existing = prev.some((i) => i.id === order.deliveryMethod.id)
    return existing ? prev : prev.concat(order.deliveryMethod)
  }, [])

  return (
    <div className="rw-orders-list">
      <OrdersFilter
        deliveryValues={deliveryValues}
        onFilter={onFilterHandler}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
