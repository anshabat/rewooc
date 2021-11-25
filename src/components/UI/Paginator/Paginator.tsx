import './Paginator.scss'
import React, { FC } from 'react'
import classNames from 'classnames'

interface PaginatorProps {
  pages?: number[]
  total: number
  perPage: number
  onChange: (page: number) => void
}

const isItemInList = (list: number | number[], item: number): boolean => {
  if (Array.isArray(list)) {
    return list.includes(item)
  } else {
    return list === item
  }
}

const Paginator: FC<PaginatorProps> = (props) => {
  const { pages = [1], perPage, total, onChange } = props

  const pagesCount = Math.ceil(total / perPage)
  const pageNumbers = new Array(pagesCount).fill(null)

  const getActiveClass = (index: number) =>
    classNames('rw-paginator__item', {
      'rw-paginator__item--active': isItemInList(pages, index),
    })

  const clickPageHandler = (page: number) => {
    if (!isItemInList(pages, page)) {
      onChange(page)
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
