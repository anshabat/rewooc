import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder, ISorting } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { usePagination } from '../../../../hooks/usePagination'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { sortObjects } from '../../../../shared/utilities'

interface IProps {
  orders: IOrder[]
}

const PER_PAGE = 3

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props

  const [filteredOrders, setFilteredOrders] = useState(orders)

  const sortingHandler = (sorting: ISorting) => {
    setFilteredOrders(sortObjects(filteredOrders, sorting))
  }

  const {
    items: paginatedOrders,
    changePage,
    currentPages,
    loadMore,
    isLoadMoreAvailable,
  } = usePagination<IOrder>(filteredOrders, PER_PAGE)

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter initialOrders={orders} onFilter={setFilteredOrders} />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          initialSorting={{ orderBy: 'id', direction: 'asc', type: 'string' }}
          orders={paginatedOrders}
          onSorting={sortingHandler}
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
          <LoadMore onLoadMore={loadMore} disabled={!isLoadMoreAvailable} />
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
