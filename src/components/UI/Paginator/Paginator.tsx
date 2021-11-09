import './Paginator.scss'
import React, { FC } from 'react'
import classNames from 'classnames'

const isItemInList = (list: number | number[], item: number) => {
  if (Array.isArray(list)) {
    return list.includes(item)
  } else {
    return list === item
  }
}

interface PaginatorProps {
  total: number
  currentPages: number | number[]
  perPage: number
  onNavigate: (page: number) => void
}

const Paginator: FC<PaginatorProps> = (props) => {
  const { currentPages, perPage, total, onNavigate } = props

  if (perPage >= total) {
    return null
  }

  const pagesCount = Math.ceil(total / perPage)
  const pageNumbers = new Array(pagesCount).fill(null)

  const getActiveClass = (index: number) =>
    classNames('rw-paginator__item', {
      'rw-paginator__item--active': isItemInList(currentPages, index),
    })

  const clickPageHandler = (page: number) => {
    if (!isItemInList(currentPages, page)) {
      onNavigate(page)
    }
  }

  return (
    <ul className="rw-paginator">
      {pageNumbers.map((_, index) => {
        const value = index + 1
        return (
          <li className={getActiveClass(value)} key={index}>
            <button
              className="rw-paginator__link"
              onClick={() => {
                clickPageHandler(value)
              }}
            >
              {value}
            </button>
          </li>
        )
      })}
    </ul>
  )
}

export default Paginator
