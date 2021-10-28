import { useEffect, useState } from 'react'

interface UseShowMoreHook<T> {
  items: T[]
  loadMore: () => void
}

export function useShowMore<T>(allItems: T[], perPage = 10): UseShowMoreHook<T> {
  const [itemsSlice, setItemsSlice] = useState<T[]>(allItems)

  useEffect(() => {
    getItemsSlice(perPage, 0)
  }, [allItems])

  const loadMore = () => {
    getItemsSlice(itemsSlice.length, perPage)
  }

  const getItemsSlice = (length: number, step: number) => {
    const sliceTo = length + step
    const newSlice = allItems.slice(0, sliceTo)
    setItemsSlice(newSlice)
  }

  return { items: itemsSlice, loadMore }
}
