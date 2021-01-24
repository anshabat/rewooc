import './Dropdown.scss'
import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../Nav'
import Icon from '../../UI/Icon/Icon'
import { siteUrl } from '../../../shared/utilities'

const Dropdown = ({
  depth,
  items,
  showItem,
  hideItem,
  hasChildItems,
  openedItems,
}) => (
  <ul className={`rw-dropdown rw-dropdown--depth-${depth}`}>
    {items.map((item) => (
      <li
        className="rw-dropdown__item"
        onMouseEnter={() => showItem(item)}
        onMouseLeave={() => hideItem(item)}
        key={item.ID}
      >
        <Link className="rw-dropdown__link" to={siteUrl(item.url)}>
          {item.title}
          {hasChildItems(item) ? (
            <Icon name="fa-angle-right" classes={['pc-dropdown__arrow']} />
          ) : null}
        </Link>
        {openedItems.includes(item.ID) ? (
          <div className="rw-dropdown__drop rw-dropdown__drop--ltr">
            <Nav parentId={item.ID} depth={depth + 1} />
          </div>
        ) : null}
      </li>
    ))}
  </ul>
)

export default Dropdown
