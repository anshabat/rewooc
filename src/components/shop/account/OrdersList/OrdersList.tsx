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
import { useQuery } from 'app-services/query'

interface IProps {
  initialOrders: IOrder[]
}

const getValuesArrayFromQueryParams = (key: string, params: any): any => {
  if (!params[key]) {
    return []
  }
  return Array.isArray(params[key]) ? params[key] : [params[key]]
}

const PER_PAGE = 3

const OrdersList: FC<IProps> = (props) => {
  const { initialOrders } = props

  const { params, updateParams } = useQuery()

  const initialValues: IOrderValues = {
    status: [...getValuesArrayFromQueryParams('status', params)],
    delivery: [...getValuesArrayFromQueryParams('delivery', params)],
  }

  const initialSorting: ISorting = {
    orderBy: 'id',
    direction: 'asc',
    type: 'string',
  }

  const [orders, setOrders] = useState(initialOrders)
  const [values, setValues] = useState(initialValues)
  const [sorting, setSorting] = useState(initialSorting)

  const sortingHandler = (sorting: ISorting) => {
    setSorting(sorting)
  }

  const filterHandler = (newValue: IOrderValues) => {
    setValues({ ...values, ...newValue })
  }

  const clearFilter = () => {
    const emptyValues = Object.keys(values).reduce<IOrderValues>((res, key) => {
      return { ...res, [key]: [] }
    }, initialValues)
    setValues(emptyValues)
  }

  const getOrders = () => {
    const sortedOrders = sortObjects(orders, sorting)
    const filteredOrders = filterOrders(sortedOrders, values)
    return filteredOrders
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
        <OrdersFilter
          initialOrders={initialOrders}
          onFilter={filterHandler}
          values={values}
          onClear={clearFilter}
        />
      </div>
      <div className="rw-orders-list__table">
        <OrdersTable
          orders={getOrders()}
          sorting={sorting}
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
