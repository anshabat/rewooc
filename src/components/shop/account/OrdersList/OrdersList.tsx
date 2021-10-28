import './OrdersList.scss'
import React, { FC, useState } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import { useSorting } from '../../../../hooks/useSorting'
import { usePagination } from '../../../../hooks/usePagination'
import Paginator from '../../../UI/Paginator/Paginator'
import { useShowMore } from '../../../../hooks/useShowMore'
import Button from '../../../UI/Button/Button'

interface IProps {
  orders: IOrder[]
}

const PER_PAGE = 2

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props

  const [filteredOrders, setFilteredOrders] = useState(orders)

  const { sortedOrders, sorting, changeOrder } = useSorting(filteredOrders, {
    orderBy: 'created.date',
    direction: 'asc',
    type: 'string',
  })

  const {
    items: paginatedOrders,
    changePage,
    currentPage,
  } = usePagination<IOrder>(sortedOrders, PER_PAGE)

  const { items: showMoreOrders, loadMore } = useShowMore<IOrder>(sortedOrders, PER_PAGE)

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter initialOrders={orders} onFilter={setFilteredOrders} />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          orders={showMoreOrders}
          sorting={sorting}
          onSorting={changeOrder}
        />
      </div>
      <div className="rw-orders-list__pagination">
        <Paginator
          total={filteredOrders.length}
          currentPage={currentPage}
          perPage={PER_PAGE}
          onNavigate={changePage}
        />
      </div>
      <div className="rw-orders-list__show-more">
        <Button
          color="secondary"
          size="lg"
          onClick={loadMore}
          disabled={showMoreOrders.length >= filteredOrders.length}
        >
          Load More
        </Button>
      </div>
    </div>
  )
}

export default OrdersList
