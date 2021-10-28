import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useSorting } from '../../../../hooks/useSorting'

interface IProps {
  orders: IOrder[]
}

type OrdersSortingType = 'total' | 'id' | 'created.date'

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const { sortedOrders, sorting, changeOrder } = useSorting<OrdersSortingType>(
    filteredOrders,
    {
      orderBy: 'created.date',
      direction: 'asc',
      type: 'string',
    }
  )

  return (
    <div className="rw-orders-list">
      <OrdersFilter initialOrders={orders} onFilter={setFilteredOrders} />
      <OrdersTable
        orders={sortedOrders}
        sorting={sorting}
        onSorting={changeOrder}
      />
    </div>
  )
}

export default OrdersList
