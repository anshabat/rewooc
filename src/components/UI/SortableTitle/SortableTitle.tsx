import './SortableTitle.scss'
import React, { FC, ReactNode } from 'react'
import Icon from '../Icon/Icon'

interface IProps {
  direction: 'asc' | 'desc' | null
  onChange: (direction: 'asc' | 'desc') => void
  children: ReactNode
}

const SortableTitle: FC<IProps> = (props) => {
  const { direction, onChange, children } = props
  function changeDirection() {
    onChange(direction === 'desc' ? 'asc' : 'desc')
  }
  const arrowName = direction === 'desc' ? 'fa-angle-up' : 'fa-angle-down'
  return (
    <button className="rw-sortable-title" onClick={changeDirection}>
      <span className="rw-sortable-title__label">{children}</span>
      {direction ? <Icon name={arrowName} /> : null}
    </button>
  )
}

export default SortableTitle
