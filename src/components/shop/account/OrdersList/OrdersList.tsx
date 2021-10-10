import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'

interface IProps {
  orders: IOrder[]
}

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props
  const [updatedOrders, setOrders] = useState(orders)

  return (
    <div className="rw-orders-list">
      <OrdersFilter orders={orders} onFilter={setOrders} />
      <OrdersTable orders={updatedOrders} />
    </div>
  )
}

export default OrdersList
