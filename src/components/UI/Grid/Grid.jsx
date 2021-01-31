import './Grid.scss'
import React from 'react'

const Grid = (props) => {
  const { items } = props

  return (
    <ul className="rw-grid">
      {items.map((item) => (
        <li className="rw-grid__item" key={item.id}>
          {props.children(item)}
        </li>
      ))}
    </ul>
  )
}

export default Grid
