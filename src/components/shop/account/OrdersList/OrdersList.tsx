import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useSorting } from '../../../../hooks/useSorting'
import { usePagination } from '../../../../hooks/usePagination'
import Paginator from '../../../UI/Paginator/Paginator'
import Button from '../../../UI/Button/Button'

interface IProps {
  orders: IOrder[]
}

const PER_PAGE = 3

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props

  const [filteredOrders, setFilteredOrders] = useState(orders)

  const { sortedOrders, sorting, changeOrder } = useSorting(filteredOrders, {
    orderBy: 'id',
    direction: 'asc',
    type: 'string',
  })

  const {
    items: paginatedOrders,
    changePage,
    currentPages,
    loadMore,
    isLoadMoreAvailable,
  } = usePagination<IOrder>(sortedOrders, PER_PAGE)

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter initialOrders={orders} onFilter={setFilteredOrders} />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          orders={paginatedOrders}
          sorting={sorting}
          onSorting={changeOrder}
        />
      </div>
      {filteredOrders.length > PER_PAGE ? (
        <div className="rw-orders-list__pagination">
          <Paginator
            total={filteredOrders.length}
            currentPages={currentPages}
            perPage={PER_PAGE}
            onNavigate={changePage}
          />
          <Button
            color="secondary"
            size="lg"
            onClick={loadMore}
            disabled={!isLoadMoreAvailable}
          >
            Load More
          </Button>
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
