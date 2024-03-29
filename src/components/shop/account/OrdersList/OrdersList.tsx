import './OrdersList.scss'
import React, { FC } from 'react'
import { IOrder } from 'types'
import OrdersTable from '../OrdersTable/OrdersTable'
import { useOrdersList } from '../../.././../hooks/useOrdersList'
import HorizontalFilter from 'components/UI/HorizontalFilter/HorizontalFilter'
import Paginator from 'components/UI/Paginator/Paginator'
import LoadMore from 'components/UI/LoadMore/LoadMore'

/**
 * Component
 */
interface IProps {
  orders: IOrder[]
}

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props

  const { state, perPage, actions, selectors } = useOrdersList(orders)
  const { attributes, pages, sorting } = state
  const {
    filterHandler,
    sortingHandler,
    changePage,
    loadMore,
    clearFilter,
  } = actions

  const { getCurrentPageOrders, getOrdersTotal } = selectors

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <HorizontalFilter
          attributes={attributes}
          onClear={clearFilter}
          onFilter={(val) => {
            filterHandler(val)
          }}
        />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          orders={getCurrentPageOrders()}
          sorting={sorting}
          onSorting={sortingHandler}
        />
      </div>
      {orders.length > perPage ? (
        <nav className="rw-orders-list__pagination" aria-label="Pagination">
          <Paginator
            pages={pages}
            total={getOrdersTotal()}
            perPage={perPage}
            onChange={changePage}
          />
          <LoadMore
            pages={pages}
            total={getOrdersTotal()}
            perPage={perPage}
            onLoadMore={loadMore}
          />
        </nav>
      ) : null}
    </div>
  )
}

export default OrdersList
