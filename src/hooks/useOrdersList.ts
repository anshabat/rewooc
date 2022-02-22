import { useReducer, useEffect } from 'react'
import { IOrder, TSorting } from 'app-types'
import { sortObjects } from '../shared/utilities'
import { IParam, useQuery } from 'app-services/query'
import {
  getAttributes,
  updateAttributes,
  filterOrders,
  TOrderFilterAttribute,
  TOrderFilterValues,
  getValuesFromAttributes,
} from '../api/order/ordersFilterApi'

/**
 * Types
 */

type TOrderBy = 'id' | 'created.date' | 'total'

export type TOrdersSorting = TSorting<TOrderBy>

type TOrdersPages = number[]

type TQueryParams = TOrderFilterValues &
  TOrdersSorting & { pages: TOrdersPages }

interface TState {
  attributes: TOrderFilterAttribute[]
  sorting: TOrdersSorting
  pages: TOrdersPages
}

interface TUseOrderListActions {
  sortingHandler: (sorting: TOrdersSorting) => void
  filterHandler: (newValue: TOrderFilterValues) => void
  clearFilter: () => void
  changePage: (page: number) => void
  loadMore: () => void
}

interface TUseOrderListSelectors {
  getCurrentPageOrders: () => IOrder[]
  getOrdersTotal: () => number
}

interface TUseOrdersList {
  state: TState
  perPage: number
  actions: TUseOrderListActions
  selectors: TUseOrderListSelectors
}

/**************************************************************
 * URL Helpers
 *************************************************************/
const getInitialPages = (queryParams: IParam<TQueryParams>) => {
  const { pages } = queryParams
  if (!pages) return [1]
  const pagesParam = Array.isArray(pages) ? pages : [pages]
  return pagesParam.map((p) => Number(p))
}

const getValuesArrayFromQueryParams = (
  param: string | string[] | undefined
): string[] => {
  if (!param) {
    return []
  }
  return Array.isArray(param) ? param : [param]
}

const getFilterValuesFromUrl = function (
  initialValues: any,
  params: IParam<TQueryParams>
): any {
  return Object.keys(initialValues).reduce<any>((result, attribute) => {
    result[attribute] = [
      ...getValuesArrayFromQueryParams(
        params[attribute as keyof TOrderFilterValues]
      ),
    ]
    return result
  }, {})
}

const getSortingValueFromUrl = function (
  sortingValue: string | string[] | undefined
): TOrderBy {
  if (
    sortingValue === 'id' ||
    sortingValue === 'total' ||
    sortingValue == 'created.date'
  ) {
    return sortingValue
  }
  return 'id'
}

const getInitialStateFromUrl = function (
  initialState: TState,
  params: IParam<TQueryParams>,
  orders: IOrder[]
): TState {
  return {
    ...initialState,
    attributes: updateAttributes(
      initialState.attributes,
      getFilterValuesFromUrl(getValuesFromAttributes(initialState.attributes), params),
      orders,
    ),
    sorting: {
      orderBy: getSortingValueFromUrl(params.orderBy),
      direction: params.direction === 'desc' ? params.direction : 'asc',
      type: params.type === 'number' ? params.type : 'string',
    },
    pages: getInitialPages(params),
  }
}
/**************************************************************
 * END URL Helpers
 *************************************************************/

/**
 * Helpers
 */
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

/**
 * Constants
 */
const PER_PAGE = 3

export function useOrdersList(orders: IOrder[]): TUseOrdersList {
  const { params, updateParams } = useQuery<TQueryParams>()

  const initialState: TState = {
    attributes: getAttributes(orders),
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

  const { pages, sorting, attributes } = state

  useEffect(() => {
    const pagesParam = pages.map((p) => String(p))
    updateParams({ ...getValuesFromAttributes(attributes), ...sorting, pages: pagesParam })
  }, [state])

  /**
   * Actions
   */
  const sortingHandler: TUseOrderListActions['sortingHandler'] = (sorting) => {
    dispatch({ type: 'SORTING', payload: { sorting } })
  }
  const filterHandler: TUseOrderListActions['filterHandler'] = (newValues) => {
    const newAttributes = updateAttributes(attributes, newValues, orders)
    dispatch({
      type: 'FILTER',
      payload: { attributes: newAttributes },
    })
  }
  const clearFilter: TUseOrderListActions['clearFilter'] = () => {
    dispatch({ type: 'CLEAR' })
  }
  const changePage: TUseOrderListActions['changePage'] = (page) => {
    dispatch({ type: 'PAGINATE', payload: { pages: [page] } })
  }
  const loadMore: TUseOrderListActions['loadMore'] = () => {
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
    const filteredOrders = filterOrders(sortedOrders, getValuesFromAttributes(attributes))
    return getItemsPageSlice(filteredOrders, pages, PER_PAGE)
  }
  const getOrdersTotal = function () {
    const filteredOrders = filterOrders(orders, getValuesFromAttributes(attributes))
    return filteredOrders.length
  }

  // console.log(state);

  return {
    state,
    perPage: PER_PAGE,
    actions: {
      sortingHandler,
      filterHandler,
      clearFilter,
      changePage,
      loadMore,
    },
    selectors: {
      getCurrentPageOrders,
      getOrdersTotal,
    },
  }
}
