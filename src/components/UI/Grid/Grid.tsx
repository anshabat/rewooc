import './Grid.scss'
import React, { ReactElement } from 'react'

interface IProps<T> {
  items: T[]
  children: (item: T) => JSX.Element
}

function Grid<P extends { id: number }>(props: IProps<P>): ReactElement {
  const { items, children } = props

  return (
    <ul className="rw-grid">
      {items.map((item) => (
        <li className="rw-grid__item" key={item.id}>
          {children(item)}
        </li>
      ))}
    </ul>
  )
}

export default Grid
