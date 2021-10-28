import { useEffect, useState } from 'react'

export function useShowMore(allItems: any[], loadCount = 2, initialLength = 4) {
  const [itemsSlice, setItemsSlice] = useState<any[]>(allItems)

  useEffect(() => {
    getItemsSlice(initialLength, 0)
  }, [allItems])

  const loadMore = () => {
    getItemsSlice(itemsSlice.length, loadCount)
  }

  const getItemsSlice = (length: number, step: number) => {
    const sliceTo = length + step
    const newSlice = allItems.slice(0, sliceTo)
    setItemsSlice(newSlice)
  }

  return { items: itemsSlice, loadMore }
}
