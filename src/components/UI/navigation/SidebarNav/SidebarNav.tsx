import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface PropsType {
  items: Array<{ url: string; name: string }>
}

const SidebarNav: FC<PropsType> = (props) => {
  const { items } = props
  return (
    <ul className="rw-sidebar-nav">
      {items.map((item, index) => {
        return (
          <li className="rw-sidebar-nav__item" key={index}>
            <Link to={item.url}>{item.name}</Link>
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarNav
