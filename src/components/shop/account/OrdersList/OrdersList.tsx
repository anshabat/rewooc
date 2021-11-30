import './OrdersList.scss'
import React, { FC, useEffect, useState } from 'react'
import { IOrder, ISorting } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { sortObjects } from '../../../../shared/utilities'
import { filterOrders } from 'app-services/orders'
import { IOrderValues } from 'app-services/orders/types'
import { IParam, useQuery } from 'app-services/query'

interface IProps {
  orders: IOrder[]
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
  const { orders } = props

  const { params, updateParams } = useQuery()

  /**
   * State
   */
  const initialFilters: IOrderValues = {
    status: [...getValuesArrayFromQueryParams('status', params)],
    delivery: [...getValuesArrayFromQueryParams('delivery', params)],
  }
  const initialPages: number[] = getInitialPages(params)
  const initialSorting: ISorting = {
    orderBy: params.orderBy || 'id',
    direction: params.direction || 'asc',
    type: params.type || 'string',
  }

  const [values, setValues] = useState(initialFilters)
  const [sorting, setSorting] = useState(initialSorting)
  const [pages, setPages] = useState(initialPages)

  /**
   * Update page url address
   */
  useEffect(() => {
    updateParams({ ...values, ...sorting, pages })
  }, [values, sorting, pages])

  /**
   * Reducers
   */
  const sortingHandler = (sorting: ISorting) => {
    setSorting(sorting)
  }
  const filterHandler = (newValue: Partial<IOrderValues>) => {
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
  const loadMore = function () {
    const newPage = pages[pages.length - 1]
    const loadedItems = newPage * PER_PAGE
    if (loadedItems < orders.length) {
      const newCurrentPages = pages.concat(newPage + 1)
      setPages(newCurrentPages)
    }
  }

  /**
   * Selectors
   */
  const getCurrentPageOrders = function () {
    const sortedOrders = sortObjects(orders, sorting)
    const filteredOrders = filterOrders(sortedOrders, values)
    const paginatedOrders = getItemsPageSlice(filteredOrders, pages, PER_PAGE)
    return paginatedOrders
  }
  const getOrdersTotal = function () {
    const filteredOrders = filterOrders(orders, values)
    return filteredOrders.length
  }

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter
          orders={orders}
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
      {orders.length > PER_PAGE ? (
        <div className="rw-orders-list__pagination">
          <Paginator
            pages={pages}
            total={getOrdersTotal()}
            perPage={PER_PAGE}
            onChange={changePage}
          />
          <LoadMore
            pages={pages}
            total={getOrdersTotal()}
            perPage={PER_PAGE}
            onLoadMore={loadMore}
          />
        </div>
      ) : null}
    </div>
  )
}

export default OrdersList
