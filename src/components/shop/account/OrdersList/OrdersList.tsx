import './OrdersList.scss'
import React, { FC, useEffect, useReducer } from 'react'
import { IOrder, ISorting, OrderStatus } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { sortObjects } from '../../../../shared/utilities'
import {
  filterOrders,
  FilterChoiceValue,
  IOrderValues,
} from 'app-services/orders'
import { IParam, useQuery } from 'app-services/query'
import { IDeliveryMethod } from 'app-api'

/**
 * Types
 */
interface IProps {
  orders: IOrder[]
}

interface IOrderAttributes {
  delivery: FilterChoiceValue[]
  status: FilterChoiceValue[]
}

export interface TOrdersFilterAttributes {
  delivery: string[]
  status: string[]
}

interface TOrdersSorting {
  orderBy: string
  direction: 'asc' | 'desc'
  type: 'number' | 'string'
}

type TOrdersPages = number[]

type TQueryParams = TOrdersFilterAttributes &
  TOrdersSorting & { pages: TOrdersPages }

interface TState {
  filter: TOrdersFilterAttributes
  sorting: TOrdersSorting
  pages: TOrdersPages
  attributes: IOrderAttributes
}

/**
 * Constants
 */
const PER_PAGE = 3

/**
 * Helpers
 */
const getStatusAttribute = (orders: IOrder[]) => {
  return orders
    .reduce<OrderStatus[]>((prev, order) => {
      const existing = prev.some((i) => i.key === order.status.key)
      return existing ? prev : prev.concat(order.status)
    }, [])
    .map<FilterChoiceValue>((value, index, array) => {
      return {
        label: value.value,
        value: value.key,
        count: array.length,
      }
    })
}

const getDeliveryAttribute = (orders: IOrder[]) => {
  return orders
    .reduce<IDeliveryMethod[]>((prev, order) => {
      const existing = prev.some((i) => i.id === order.deliveryMethod.id)
      return existing ? prev : prev.concat(order.deliveryMethod)
    }, [])
    .map<FilterChoiceValue>((value, index, array) => {
      return {
        label: value.title,
        value: String(value.id),
        count: array.length,
      }
    })
}

const getValuesArrayFromQueryParams = (
  param: string | string[] | undefined
): Array<string> => {
  if (!param) {
    return []
  }
  return Array.isArray(param) ? param : [param]
}

const getInitialPages = (queryParams: IParam<TQueryParams>) => {
  const { pages } = queryParams
  if (!pages) return [1]
  const pagesParam = Array.isArray(pages) ? pages : [pages]
  return pagesParam.map((p) => Number(p))
}

const getItemsPageSlice = function <T>(
  items: T[],
  pages: TOrdersPages,
  perPage: number
) {
  const fromIndex = perPage * (pages[0] - 1)
  const toIndex = perPage * pages[pages.length - 1]
  if (fromIndex >= items.length) {
    return items
  }
  return items.slice(fromIndex, toIndex)
}

const getStateFromUrl = function (
  initialState: TState,
  params: IParam<TQueryParams>
): TState {
  const filter = Object.keys(initialState.filter).reduce<any>(
    (result, attribute) => {
      result[attribute] = [
        ...getValuesArrayFromQueryParams(
          params[attribute as keyof TOrdersFilterAttributes]
        ),
      ]
      return result
    },
    {}
  )

  return {
    ...initialState,
    filter,
    sorting: {
      orderBy: typeof params.orderBy === 'string' ? params.orderBy : 'id',
      direction: params.direction === 'desc' ? params.direction : 'asc',
      type: params.type === 'number' ? params.type : 'string',
    },
    pages: getInitialPages(params),
  }
}

/**
 * State
 */
const initialState: TState = {
  filter: {
    status: [],
    delivery: [],
  },
  sorting: {
    orderBy: 'id',
    direction: 'asc',
    type: 'string',
  },
  pages: [1],
  attributes: {
    delivery: [],
    status: [],
  },
}

const OrdersList: FC<IProps> = (props) => {
  const { orders } = props
  const { params, updateParams } = useQuery<TQueryParams>()

  const [state, dispatch] = useReducer(
    (state: TState, action: any): TState => {
      switch (action.type) {
        case 'SORTING':
          return { ...state, sorting: action.payload.sorting }
        case 'FILTER':
          return {
            ...initialState,
            filter: { ...state.filter, ...action.payload.value },
          }
        case 'CLEAR':
          return { ...initialState }
        case 'PAGINATE':
        case 'LOAD_MORE':
          return { ...state, pages: action.payload.pages }
        default:
          return state
      }
    },
    {
      ...getStateFromUrl(initialState, params),
      attributes: {
        delivery: getDeliveryAttribute(orders),
        status: getStatusAttribute(orders),
      },
    }
  )

  const { pages, sorting, filter } = state

  /**
   * Update page url address on user events
   */
  useEffect(() => {
    const pagesParam = pages.map((p) => String(p))
    updateParams({ ...filter, ...sorting, pages: pagesParam })
  }, [state])

  /**
   * Actions
   */
  const sortingHandler = (sorting: ISorting) => {
    dispatch({ type: 'SORTING', payload: { sorting } })
  }
  const filterHandler = (newValue: Partial<IOrderValues>) => {
    dispatch({ type: 'FILTER', payload: { value: newValue } })
  }
  const clearFilter = () => {
    dispatch({ type: 'CLEAR' })
  }
  const changePage = (page: number) => {
    dispatch({ type: 'PAGINATE', payload: { pages: [page] } })
  }
  const loadMore = function () {
    const newPage = pages[pages.length - 1]
    const loadedItems = newPage * PER_PAGE
    if (loadedItems < orders.length) {
      const newCurrentPages = pages.concat(newPage + 1)
      dispatch({ type: 'LOAD_MORE', payload: { pages: newCurrentPages } })
    }
  }

  /**
   * Selectors
   */
  const getCurrentPageOrders = function () {
    const sortedOrders = sortObjects(orders, sorting)
    const filteredOrders = filterOrders(sortedOrders, filter)
    return getItemsPageSlice(filteredOrders, pages, PER_PAGE)
  }
  const getOrdersTotal = function () {
    const filteredOrders = filterOrders(orders, filter)
    return filteredOrders.length
  }

  return (
    <div className="rw-orders-list">
      <div className="rw-orders-list__filter">
        <OrdersFilter
          orders={orders}
          onFilter={filterHandler}
          values={filter}
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
