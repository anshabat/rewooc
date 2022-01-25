import './OrdersList.scss'
import React, { FC } from 'react'
import { IOrder } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { useOrdersList } from '../../.././../hooks/useOrdersList'

/**
 * Component
 */
interface IProps {
  orders: IOrder[]
}

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props

  const { state, perPage, actions, selectors } = useOrdersList(orders)
  const { pages, sorting, values, attributes } = state
  const {
    filterHandler,
    sortingHandler,
    changePage,
    loadMore,
    clearFilter,
  } = actions

  const {getCurrentPageOrders, getOrdersTotal} = selectors

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter
          attributes={attributes}
          onFilter={filterHandler}
          values={values}
          onClear={clearFilter}
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
        <div className="rw-orders-list__pagination">
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
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
