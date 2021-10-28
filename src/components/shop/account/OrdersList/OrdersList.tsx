import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useSorting } from '../../../../hooks/useSorting'
import { usePagination } from '../../../../hooks/usePagination'

interface IProps {
  orders: IOrder[]
}

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props
  const [filteredOrders, setFilteredOrders] = useState(orders)
  const { sortedOrders, sorting, changeOrder } = useSorting(filteredOrders, {
    orderBy: 'created.date',
    direction: 'asc',
    type: 'string',
  })
  const { items: paginatedOrders, changePage } = usePagination<IOrder>(
    sortedOrders,
    2
  )

  return (
    <div className="rw-orders-list">
      <OrdersFilter initialOrders={orders} onFilter={setFilteredOrders} />
      <OrdersTable
        orders={paginatedOrders}
        sorting={sorting}
        onSorting={changeOrder}
      />
      <button
        onClick={() => {
          changePage(2)
        }}
      >
        go to 2 page
      </button>
    </div>
  )
}

export default OrdersList
