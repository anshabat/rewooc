import { useEffect, useState } from 'react'

interface UsePaginationHook<T> {
  items: T[]
  currentPage: number
  changePage: (page: number) => void
}

export function usePagination<T>(
  items: T[],
  perPage = 10
): UsePaginationHook<T> {
  const [itemsSlice, setItemsSlice] = useState(items)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    setItemsSlice(sliceItems())
  }, [currentPage, items])

  /* Reset pagination to first page after items were changed (filtered, sorted etc) */
  useEffect(() => {
    setCurrentPage(1)
  }, [items])

  const sliceItems = () => {
    const fromIndex = perPage * (currentPage - 1)
    const toIndex = fromIndex + perPage
    if (fromIndex >= items.length) {
      return items
    }
    return items.slice(fromIndex, toIndex)
  }

  const changePage = (page: number) => {
    setCurrentPage(page)
  }

  return { items: itemsSlice, changePage, currentPage }
}
