import { useEffect, useState } from 'react'

interface UsePaginationHook<T> {
  items: T[]
  currentPages: number[]
  changePage: (page: number) => void
  loadMore: any
}

export function usePagination<T>(
  items: T[],
  perPage = 10
): UsePaginationHook<T> {
  const [itemsSlice, setItemsSlice] = useState(items)
  const [currentPages, setCurrentPage] = useState([1])

  useEffect(() => {
    setItemsSlice(sliceItems(currentPages))
  }, [currentPages, items])

  /* Reset pagination to first page after items were changed (filtered, sorted etc) */
  useEffect(() => {
    setCurrentPage([1])
  }, [items])

  const sliceItems = (pages: number[]) => {
    const fromIndex = perPage * (pages[0] - 1)
    const toIndex = perPage * pages[pages.length - 1]
    if (fromIndex >= items.length) {
      return items
    }
    return items.slice(fromIndex, toIndex)
  }

  const loadMore = () => {
    const newPage = currentPages[currentPages.length - 1]
    const loadedItems = newPage * perPage
    if (loadedItems < items.length) {
      const newCurrentPages = currentPages.concat(newPage + 1)
      setCurrentPage(newCurrentPages)
    }
  }

  const changePage = (page: number) => {
    setCurrentPage([page])
  }

  return { items: itemsSlice, changePage, currentPages, loadMore }
}
