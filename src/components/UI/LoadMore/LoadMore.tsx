import React, { FC } from 'react'
import Button from '../Button/Button'

interface TLoadMore {
  onLoadMore: () => void
  disabled?: boolean
}

const LoadMore: FC<TLoadMore> = (props) => {
  const { onLoadMore, disabled = false } = props

  return (
    <Button
      color="secondary"
      size="lg"
      onClick={onLoadMore}
      disabled={disabled}
    >
      Load More
    </Button>
  )
}

export default LoadMore
