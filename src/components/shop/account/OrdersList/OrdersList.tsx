import './OrdersList.scss'
import React, { FC, useEffect, useReducer } from 'react'
import { IOrder, ISorting } from 'app-types'
import OrdersTable from '../OrdersTable/OrdersTable'
import OrdersFilter from '../OrdersFilter/OrdersFilter'
import Paginator from '../../../UI/Paginator/Paginator'
import LoadMore from '../../../UI/LoadMore/LoadMore'
import { sortObjects } from '../../../../shared/utilities'
import { filterOrders, FilterChoiceValue } from 'app-services/orders'
import { IParam, useQuery } from 'app-services/query'

/**
 * Types
 */
interface IProps {
  orders: IOrder[]
}

export interface IOrderAttributes {
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

const getAttributeFromOrders = function (
  orders: any[],
  attributeName: keyof IOrder,
  cb: (arg: any) => FilterChoiceValue
) {
  return orders
    .map((order) => {
      return { ...order, [attributeName]: cb(order[attributeName]) }
    })
    .reduce<any[]>((prev, order) => {
      const existing = prev.some((i) => i.value === order[attributeName].value)
      return existing ? prev : prev.concat(order[attributeName])
    }, [])
    .map<FilterChoiceValue>((attr) => {
      return {
        label: attr.label,
        value: String(attr.value),
      }
    })
}

const addCountToAttribute = function (
  orders: IOrder[],
  attributeName: keyof TOrdersFilterAttributes,
  options: FilterChoiceValue[],
  initialValues: TOrdersFilterAttributes
): FilterChoiceValue[] {
  return options.map<FilterChoiceValue>((option) => {
    const { label, value } = option
    const filteredOrders = filterOrders(orders, {
      ...initialValues,
      [attributeName]: [value],
    })
    return {
      label,
      value,
      count: filteredOrders.length,
    }
  })
}

const getValuesArrayFromQueryParams = (
  param: string | string[] | undefined
): string[] => {
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

const getFilterValuesFromUrl = function (
  initialValues: any,
  params: IParam<TQueryParams>
): any {
  return Object.keys(initialValues).reduce<any>((result, attribute) => {
    result[attribute] = [
      ...getValuesArrayFromQueryParams(
        params[attribute as keyof TOrdersFilterAttributes]
      ),
    ]
    return result
  }, {})
}

const updateAttributeValuesCount = (
  key: keyof IOrderAttributes,
  values: TOrdersFilterAttributes,
  orders: IOrder[],
  attributes: IOrderAttributes
): FilterChoiceValue[] => {
  return attributes[key].map((attr) => {
    const nextValues = [...values[key], attr.value]
    const filteredOrders = filterOrders(orders, {
      ...values,
      [key]: nextValues,
    })
    return {
      value: attr.value,
      label: attr.label,
      count: filteredOrders.length,
    }
  })
}

const updateAttributes = (
  newValues: TOrdersFilterAttributes,
  orders: IOrder[],
  attributes: IOrderAttributes
) => {
  const newAttributes: IOrderAttributes = {
    status: updateAttributeValuesCount('status', newValues, orders, attributes),
    delivery: updateAttributeValuesCount(
      'delivery',
      newValues,
      orders,
      attributes
    ),
  }
  return newAttributes
}

const getInitialStateFromUrl = function (
  initialState: TState,
  params: IParam<TQueryParams>,
  orders: IOrder[]
): TState {
  return {
    ...initialState,
    attributes: updateAttributes(
      getFilterValuesFromUrl(initialState.filter, params),
      orders,
      initialState.attributes
    ),
    filter: getFilterValuesFromUrl(initialState.filter, params),
    sorting: {
      orderBy: typeof params.orderBy === 'string' ? params.orderBy : 'id',
      direction: params.direction === 'desc' ? params.direction : 'asc',
      type: params.type === 'number' ? params.type : 'string',
    },
    pages: getInitialPages(params),
  }
}

/**
 * Component
 */
const OrdersList: FC<IProps> = (props) => {
  const { orders } = props
  const { params, updateParams } = useQuery<TQueryParams>()

  const initialValues: TOrdersFilterAttributes = {
    status: [],
    delivery: [],
  }

  const delivery = getAttributeFromOrders(
    orders,
    'deliveryMethod',
    (delivery) => {
      return { value: delivery.id, label: delivery.title }
    }
  )
  const deliveryWithCount = addCountToAttribute(
    orders,
    'delivery',
    delivery,
    initialValues
  )

  const status = getAttributeFromOrders(orders, 'status', (status) => {
    return { value: status.key, label: status.value }
  })
  const statusWithCount = addCountToAttribute(
    orders,
    'status',
    status,
    initialValues
  )

  /**
   * State
   */
  const initialState: TState = {
    attributes: {
      delivery: deliveryWithCount,
      status: statusWithCount,
    },
    filter: initialValues,
    sorting: {
      orderBy: 'id',
      direction: 'asc',
      type: 'string',
    },
    pages: [1],
  }

  /**
   * Reducer
   */
  const [state, dispatch] = useReducer(
    (state: TState, action: any): TState => {
      switch (action.type) {
        case 'SORTING':
          return { ...state, sorting: action.payload.sorting }
        case 'FILTER':
          return {
            ...initialState,
            filter: { ...state.filter, ...action.payload.value },
            attributes: action.payload.attributes,
          }
        case 'CLEAR':
          return {
            ...initialState,
          }
        case 'PAGINATE':
        case 'LOAD_MORE':
          return { ...state, pages: action.payload.pages }
        default:
          throw new Error(`Unsupported action type: ${action.type}`)
      }
    },
    initialState,
    (initialState) => getInitialStateFromUrl(initialState, params, orders)
  )

  const { pages, sorting, filter, attributes } = state

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
  const filterHandler = (newValue: Partial<TOrdersFilterAttributes>) => {
    const newAttributes = updateAttributes(
      { ...filter, ...newValue },
      orders,
      attributes
    )
    dispatch({
      type: 'FILTER',
      payload: { value: newValue, attributes: newAttributes },
    })
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
          attributes={attributes}
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
