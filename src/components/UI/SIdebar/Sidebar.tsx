import './Sidebar.scss'
import React, { FC } from 'react'

const Sidebar: FC = (props) => {
  const { children } = props

  return <div className="rw-sidebar">{children}</div>
}

export default Sidebar
