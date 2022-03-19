import React, { FC } from 'react'
import Nav from '../Nav'
import { Link } from 'react-router-dom'
import { siteUrl } from '../../../shared/utilities'
import { INavItem } from 'types'

interface IProps {
  items: INavItem[]
  depth: number
}

const MegaNav: FC<IProps> = (props) => {
  const { items, depth } = props
  return (
  <ul className="megaNav">
    {items.map((item) => (
      <li key={item.ID}>
        <Link to={siteUrl(item.url)}>{item.title}</Link> - {depth}
        <Nav parentId={item.ID} depth={depth + 1} />
      </li>
    ))}
  </ul>
)}

export default MegaNav
