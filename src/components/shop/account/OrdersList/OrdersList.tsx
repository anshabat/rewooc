import './OrdersList.scss'
import React, { FC } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useOrdersFilter } from '../../../../hooks/useOrdersFilter'

interface OrdersListProps {
  orders: IOrder[]
}

const OrdersList: FC<OrdersListProps> = (props) => {
  const { orders } = props
  const { filteredOrders, updatedAttributes, applyFilter } = useOrdersFilter(
    orders
  )

  return (
    <div className="rw-orders-list">
      <OrdersFilter attributes={updatedAttributes} onFilter={applyFilter} />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
