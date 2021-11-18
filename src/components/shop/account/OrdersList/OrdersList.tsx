import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder, ISorting } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { usePagination } from '../../../../hooks/usePagination'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { sortObjects } from '../../../../shared/utilities'
import { filterOrders } from 'app-services/orders'
import { IOrderValues } from 'app-services/orders/types'

interface IProps {
  initialOrders: IOrder[]
}

const PER_PAGE = 3

const OrdersList: FC<IProps> = (props) => {
  const { initialOrders } = props

  const [orders, setOrders] = useState(initialOrders)

  const sortingHandler = (sorting: ISorting) => {
    setOrders(sortObjects(orders, sorting))
  }

  const filterHandler = (values: IOrderValues) => {
    setOrders(filterOrders(initialOrders, values))
  }

  const {
    items: paginatedOrders,
    changePage,
    currentPages,
    loadMore,
    isLoadMoreAvailable,
  } = usePagination<IOrder>(orders, PER_PAGE)

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter initialOrders={initialOrders} onFilter={filterHandler} />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          orders={paginatedOrders}
          initialSorting={{ orderBy: 'id', direction: 'asc', type: 'string' }}
          onSorting={sortingHandler}
        />
      </div>
      {orders.length > PER_PAGE ? (
        <div className="rw-orders-list__pagination">
          <Paginator
            total={orders.length}
            currentPages={currentPages}
            perPage={PER_PAGE}
            onNavigate={changePage}
          />
          <LoadMore onLoadMore={loadMore} disabled={!isLoadMoreAvailable} />
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
