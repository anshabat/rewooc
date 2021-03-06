import './ListNav.scss'
import React, { FC } from 'react'
import Nav, { IChildNav } from '../Nav'
import Icon from '../../UI/Icon/Icon'
import { Link } from 'react-router-dom'
import { siteUrl } from '../../../shared/utilities'

const ListNav: FC<IChildNav> = (props) => {
  const {
    depth,
    items,
    showItem,
    hideItem,
    hasChildItems,
    openedItems,
  } = props

  return (
    <ul className={`rw-list-nav rw-list-nav--depth-${depth}`}>
      {items.map((item) => {
        return (
          <li
            className="rw-list-nav__item"
            onMouseEnter={() => showItem(item)}
            onMouseLeave={() => hideItem(item)}
            key={item.ID}
          >
            <Link className="rw-list-nav__link" to={siteUrl(item.url)}>
              {item.title}
              {hasChildItems(item) ? (
                <Icon name="fa-angle-down" classes={['rw-list-nav__arrow']} />
              ) : null}
            </Link>
            {openedItems.includes(item.ID) ? (
              <div className="rw-list-nav__drop rw-list-nav__drop--ltr">
                <Nav parentId={item.ID} depth={depth + 1} />
              </div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}

export default ListNav
