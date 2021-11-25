import React, { FC, useMemo } from 'react'
import Button from '../Button/Button'

interface TLoadMore {
  pages: number[]
  onLoadMore: () => void
  perPage: number
  total: number
}

const LoadMore: FC<TLoadMore> = (props) => {
  const { pages, onLoadMore, total, perPage } = props

  const isDisabled = useMemo(() => {
    const loadedItems = pages[pages.length - 1] * perPage
    return loadedItems >= total
  }, [pages, perPage, total])

  return (
    <Button
      color="secondary"
      size="lg"
      onClick={onLoadMore}
      disabled={isDisabled}
    >
      Load More
    </Button>
  )
}

export default LoadMore
