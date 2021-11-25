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
import { IParam, useQuery } from 'app-services/query'

interface IProps {
  initialOrders: IOrder[]
}

const PER_PAGE = 3

/**
 * Helpers
 */
const getValuesArrayFromQueryParams = (key: string, params: any): any => {
  if (!params[key]) {
    return []
  }
  return Array.isArray(params[key]) ? params[key] : [params[key]]
}
const getInitialPages = (queryParams: IParam) => {
  const { pages } = queryParams
  if (!pages) return [1]
  const pagesParam = Array.isArray(pages) ? pages : [pages]
  return pagesParam.map((p) => Number(p))
}
const getItemsPageSlice = function <T>(
  items: T[],
  pages: number[],
  perPage: number
) {
  const fromIndex = perPage * (pages[0] - 1)
  const toIndex = perPage * pages[pages.length - 1]
  if (fromIndex >= items.length) {
    return items
  }
  return items.slice(fromIndex, toIndex)
}

const OrdersList: FC<IProps> = (props) => {
  const { initialOrders } = props

  const { params, updateParams } = useQuery()

  /**
   * State
   */
  const initialFilters: IOrderValues = {
    status: [...getValuesArrayFromQueryParams('status', params)],
    delivery: [...getValuesArrayFromQueryParams('delivery', params)],
  }
  const initialSorting: ISorting = {
    orderBy: 'id',
    direction: 'asc',
    type: 'string',
  }
  const initialPages: number[] = getInitialPages(params)

  const [orders, setOrders] = useState(initialOrders)
  const [values, setValues] = useState(initialFilters)
  const [sorting, setSorting] = useState(initialSorting)
  const [pages, setPages] = useState(initialPages)

  /**
   * Reducers
   */
  const sortingHandler = (sorting: ISorting) => {
    setSorting(sorting)
  }
  const filterHandler = (newValue: IOrderValues) => {
    setValues({ ...values, ...newValue })
  }
  const clearFilter = () => {
    const emptyValues = Object.keys(values).reduce<IOrderValues>((res, key) => {
      return { ...res, [key]: [] }
    }, initialFilters)
    setValues(emptyValues)
  }
  const changePage = (page: number) => {
    setPages([page])
  }

  /**
   * Orders selector
   */
  const getOrders = () => {
    const sortedOrders = sortObjects(orders, sorting)
    const filteredOrders = filterOrders(sortedOrders, values)
    const paginatedOrders = getItemsPageSlice(filteredOrders, pages, PER_PAGE)
    return paginatedOrders
  }

  /*const {
    items: paginatedOrders,
    changePage,
    currentPages,
    loadMore,
    isLoadMoreAvailable,
  } = usePagination<IOrder>(orders, PER_PAGE)*/

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
            pages={pages}
            total={orders.length}
            perPage={PER_PAGE}
            onChange={changePage}
          />
          {/*<LoadMore onLoadMore={loadMore} disabled={!isLoadMoreAvailable} />*/}
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
