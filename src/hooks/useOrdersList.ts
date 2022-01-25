import { useReducer, useEffect } from 'react'
import { IOrder, ISorting } from 'app-types'
import { FilterChoiceValue, Filter } from 'app-services/filter'
import { sortObjects } from '../shared/utilities'
import { IParam, useQuery } from 'app-services/query'

/**
 * Types
 */
interface TFilterAttribute {
  key: string
  type: string
}

interface TFilterChoiseAttribute extends TFilterAttribute {
  options: FilterChoiceValue[]
}

export type TOrderAttributes = Array<TFilterChoiseAttribute>

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
  attributes: TOrderAttributes
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

/**
 * Constants
 */
const PER_PAGE = 3

/**************************************************************
 * Paginations helpers
 *************************************************************/
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

/**************************************************************
 * URL Helpers
 *************************************************************/
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
 * Filter helpers
 *************************************************************/
const getAttributeFromOrders = function (
  orders: any[],
  attributeName: keyof IOrder,
  cb: (arg: any) => FilterChoiceValue
): FilterChoiceValue[] {
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

const mergeValues = (
  currentValues: TOrdersFilterAttributes,
  newValue: Record<string, string>
) => {
  // TODO change Record<string, string> to smth like Record<keyof TOrdersFilterAttributes, string>
  const values = { ...currentValues }
  const key = Object.keys(newValue)[0] as keyof TOrdersFilterAttributes
  values[key] = [...values[key], newValue[key]]
  return values
}

function addCountToAttributeOption(
  key: string,
  options: FilterChoiceValue[],
  orders: IOrder[],
  initialValues: TOrdersFilterAttributes
): FilterChoiceValue[] {
  return options.map((option) => {
    const vals = mergeValues(initialValues, { [key]: option.value })
    const filteredOrders = filterOrders(orders, vals)
    return { ...option, count: filteredOrders.length }
  })
}

const updateAttributes = (
  values: TOrdersFilterAttributes,
  orders: IOrder[],
  attributes: TOrderAttributes
): TOrderAttributes => {
  return [
    {
      key: 'status',
      type: 'choise',
      options: addCountToAttributeOption(
        'status',
        attributes[0].options,
        orders,
        values
      ),
    },
    {
      key: 'delivery',
      type: 'choise',
      options: addCountToAttributeOption(
        'delivery',
        attributes[1].options,
        orders,
        values
      ),
    },
  ]
  // return {
  //   status: addCountToAttributeOption(
  //     'status',
  //     attributes['status'],
  //     orders,
  //     values
  //   ),
  //   delivery: addCountToAttributeOption(
  //     'delivery',
  //     attributes['delivery'],
  //     orders,
  //     values
  //   ),
  // }
}

export const filterOrders = (
  orders: IOrder[],
  values: TOrdersFilterAttributes
): IOrder[] => {
  return new Filter(orders)
    .by('status.key', values.status)
    .by('deliveryMethod.id', values.delivery)
    .getItems()
}

/**************************************************************
 * useOrdersList HOOK
 *************************************************************/
export function useOrdersList(orders: IOrder[]): TUseOrdersList {
  const { params, updateParams } = useQuery<TQueryParams>()

  /**
   * Initial values
   */
  const initialValues = {
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
  const status = getAttributeFromOrders(orders, 'status', (status) => {
    return { value: status.key, label: status.value }
  })
  const initialAttributes = updateAttributes(initialValues, orders, [
    { key: 'status', type: 'choise', options: status },
    { key: 'delivery', type: 'choise', options: delivery },
  ])

  /**
   * State
   */
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
