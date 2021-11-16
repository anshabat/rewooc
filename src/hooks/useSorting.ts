import { ChangeOrderType, ISorting, TGetSortingDirection } from 'app-types'
import { useEffect, useState } from 'react'

interface IUseSorting {
  getDirection: TGetSortingDirection
  setDirection: ChangeOrderType
}

export function useSorting(
  initialSorting: ISorting,
  onSorting: (sorting: ISorting) => void
): IUseSorting {
  const [sorting, setSorting] = useState<ISorting>(initialSorting)

  useEffect(() => {
    onSorting(sorting)
  }, [sorting])

  const setDirection: ChangeOrderType = (orderBy, direction, type) => {
    setSorting({ orderBy, direction, type })
  }

  const getDirection: TGetSortingDirection = (orderBy) => {
    return sorting.orderBy === orderBy ? sorting.direction : null
  }

  return { getDirection, setDirection }
}
