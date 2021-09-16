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

const filterByStatus = (orders: IOrder[], statuses: string[]): IOrder[] => {
  if (!statuses.length) return orders
  return orders.filter((order) => statuses.includes(order.status))
}

const filterByDelivery = (orders: IOrder[], deliveries: string[]): IOrder[] => {
  if (!deliveries.length) return orders
  return orders.filter((order) =>
    deliveries.includes(String(order.deliveryMethod.id))
  )
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const onFilterHandler = (attributes: OrderFilterAttributes) => {
    const newOrders = filterByStatus(orders, attributes.status)
    const newOrders2 = filterByDelivery(newOrders, attributes.delivery)
    setFilteredOrders(newOrders2)
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
