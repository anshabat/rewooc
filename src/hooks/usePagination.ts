import { useEffect, useState } from 'react'
import { IParam, useQuery } from 'app-services/query'

interface UsePaginationHook<T> {
  items: T[]
  currentPages: number[]
  changePage: (page: number) => void
  loadMore: () => void
  isLoadMoreAvailable: boolean
}

const getInitialPages = (queryParams: IParam) => {
  const { pages } = queryParams
  if (!pages) return [1]
  const pagesParam = Array.isArray(pages) ? pages : [pages]
  return pagesParam.map((p) => Number(p))
}

export function usePagination<T>(
  items: T[],
  perPage = 10
): UsePaginationHook<T> {
  const [itemsSlice, setItemsSlice] = useState(items)
  const { params: queryParams, updateParams } = useQuery()
  const [currentPages, setCurrentPages] = useState(getInitialPages(queryParams))
  const [isLoadMoreAvailable, setIsLoadMoreAvailable] = useState(true)

  useEffect(() => {
    setItemsSlice(sliceItems(currentPages))
    setIsLoadMoreAvailable(checkLoadMoreAvailability(currentPages))
    updateUrl(currentPages)
  }, [currentPages.reduce((sum, next) => sum + next), items])

  /* Reset pagination to first page after items were changed (filtered, sorted etc) */
  /*useEffect(() => {
    console.log(items, 'items')
    if(didMount.current) {
      setCurrentPages([1])
    } else {
      didMount.current = true
    }
  }, [items.length])*/

/*  useEffect(() => {
    //TODO stop flickering url param
    setTimeout(() => {
      const a = getInitialPages(queryParams)
      console.log(a, queryParams)
      setCurrentPages(a)
    }, 0)
  }, [])*/

  const sliceItems = (pages: number[]) => {
    const fromIndex = perPage * (pages[0] - 1)
    const toIndex = perPage * pages[pages.length - 1]
    if (fromIndex >= items.length) {
      return items
    }
    return items.slice(fromIndex, toIndex)
  }

  const updateUrl = (pages: number[]) => {
    updateParams({
      pages: pages.map((p) => String(p)),
    })
  }

  const checkLoadMoreAvailability = (pages: number[]) => {
    const loadedItems = pages[pages.length - 1] * perPage
    return loadedItems < items.length
  }

  const changePage = (page: number) => {
    setCurrentPages([page])
  }

  const loadMore = () => {
    const newPage = currentPages[currentPages.length - 1]
    const loadedItems = newPage * perPage
    if (loadedItems < items.length) {
      const newCurrentPages = currentPages.concat(newPage + 1)
      setCurrentPages(newCurrentPages)
    }
  }

  return {
    items: itemsSlice,
    changePage,
    currentPages,
    loadMore,
    isLoadMoreAvailable,
  }
}
