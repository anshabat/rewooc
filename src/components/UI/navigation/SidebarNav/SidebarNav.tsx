import './SidebarNav.scss'
import React, { FC } from 'react'
import A from '../../A/A'

interface PropsType {
  items: Array<{ url: string; name: string }>
}

const SidebarNav: FC<PropsType> = (props) => {
  const { items } = props
  return (
    <ul className="rw-sidebar-nav">
      {items.map((item, index) => {
        return (
          <li key={index}>
            <A to={item.url}>{item.name}</A>
          </li>
        )
      })}
    </ul>
  )
}

export default SidebarNav
