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
  const { filteredOrders, deliveries, statuses, applyFilter } = useOrdersFilter(
    orders
  )

  return (
    <div className="rw-orders-list">
      <OrdersFilter
        deliveryOptions={deliveries}
        statusOptions={statuses}
        onFilter={applyFilter}
      />
      <OrdersTable orders={filteredOrders} />
    </div>
  )
}

export default OrdersList
