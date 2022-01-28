import { useReducer, useEffect } from 'react'
import { IOrder, ISorting } from 'app-types'
import { FilterChoiceValue } from 'app-services/filter'
import { sortObjects } from '../shared/utilities'
import { IParam, useQuery } from 'app-services/query'
import {
  TFilterChoiseAttribute,
  getAttributes,
  updateAttributes,
  filterOrders,
} from '../api/order/ordersFilterApi'
/**
 * Types
 */
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
  attributes: TFilterChoiseAttribute[]
  values: TOrdersFilterAttributes
  sorting: TOrdersSorting
  pages: TOrdersPages
}

interface TUseOrderListActions {
  sortingHandler: (sorting: ISorting) => void
  filterHandler: (newValue: Partial<TOrdersFilterAttributes>) => void
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
        params[attribute as keyof TOrdersFilterAttributes]
      ),
    ]
    return result
  }, {})
}

const getInitialStateFromUrl = function (
  initialState: TState,
  params: IParam<TQueryParams>,
  orders: IOrder[]
): TState {
  return {
    ...initialState,
    attributes: updateAttributes(
      getFilterValuesFromUrl(initialState.values, params),
      orders,
      initialState.attributes
    ),
    values: getFilterValuesFromUrl(initialState.values, params),
    sorting: {
      orderBy: typeof params.orderBy === 'string' ? params.orderBy : 'id',
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
 * Constants
 */
const PER_PAGE = 3

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

export function useOrdersList(orders: IOrder[]): TUseOrdersList {
  const { params, updateParams } = useQuery<TQueryParams>()
  const attrs = getAttributes(orders)

  /**
   * State
   */
  const initialValues = {
    status: [],
    delivery: [],
  }
  const initialAttributes = updateAttributes(initialValues, orders, attrs)
  const initialState: TState = {
    attributes: initialAttributes,
    values: initialValues,
    sorting: {
      orderBy: 'id',
      direction: 'asc',
      type: 'string',
    },
    pages: [1],
  }

  const [state, dispatch] = useReducer(
    (state: TState, action: any): TState => {
      switch (action.type) {
        case 'SORTING':
          return { ...state, sorting: action.payload.sorting }
        case 'FILTER':
          return {
            ...initialState,
            values: { ...state.values, ...action.payload.value },
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

  const { pages, sorting, values, attributes } = state

  useEffect(() => {
    const pagesParam = pages.map((p) => String(p))
    updateParams({ ...values, ...sorting, pages: pagesParam })
  }, [state])

  /**
   * Actions
   */
  const sortingHandler: TUseOrderListActions['sortingHandler'] = (sorting) => {
    dispatch({ type: 'SORTING', payload: { sorting } })
  }
  const filterHandler: TUseOrderListActions['filterHandler'] = (newValue) => {
    const newAttributes = updateAttributes(
      { ...values, ...newValue },
      orders,
      attributes
    )
    dispatch({
      type: 'FILTER',
      payload: { value: newValue, attributes: newAttributes },
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
    const filteredOrders = filterOrders(sortedOrders, values)
    return getItemsPageSlice(filteredOrders, pages, PER_PAGE)
  }
  const getOrdersTotal = function () {
    const filteredOrders = filterOrders(orders, values)
    return filteredOrders.length
  }

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
