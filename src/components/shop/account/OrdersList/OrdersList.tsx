import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter, {
  OrderFilterAttributes,
} from '../OrdersFilter/OrdersFilter'

interface OrdersListProps {
  orders: IOrder[]
}

const filterByStatus = (orders: IOrder[], statuses: string[]): IOrder[] => {
  if (!statuses.length) return orders
  return orders.filter((order) => statuses.includes(order.status))
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)

  const onFilterHandler = (attributes: OrderFilterAttributes) => {
    const newOrders = filterByStatus(orders, attributes.status)
    setFilteredOrders(newOrders)
  }

  return (
    <div className="rw-orders-list">
      <OrdersFilter onFilter={onFilterHandler} />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
