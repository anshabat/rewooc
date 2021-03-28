import './Nav.scss'
import React, { FC, useState } from 'react'
import { INavItem } from 'app-types'

export interface IChildNav {
  items: INavItem[]
  depth: number
  openedItems: number[]
  showItem: (item: INavItem) => void
  hideItem: (item: INavItem) => void
  hasChildItems: (item: INavItem) => boolean
}

interface IProps {
  items?: INavItem[]
  navs?: FC<IChildNav>[]
  parentId?: number
  depth?: number
  opened?: boolean
}

let allItems: INavItem[] = []
let allNavs: FC<IChildNav>[] = []

const Nav: FC<IProps> = (props) => {
  const { items, navs, parentId = 0, opened = true, depth = 1 } = props
  allItems = items || allItems
  allNavs = navs || allNavs
  const [openedItems, setOpenItems] = useState<number[]>([])
  const childItems = allItems.filter(
    (item) => Number(item.menu_item_parent) === parentId
  )
  const ChildNav = allNavs[depth - 1] || allNavs[allNavs.length - 1]

  const hasChildItems = (item: INavItem): boolean => {
    return allItems.some((i) => Number(i.menu_item_parent) === item.ID)
  }

  const showItem = (item: INavItem): void => {
    if (!hasChildItems(item)) {
      return
    }
    setOpenItems((items) => {
      items.push(item.ID)
      console.log(items)
      return items
    })
  }

  const hideItem = (item: INavItem): void => {
    if (!hasChildItems(item)) {
      return
    }
    setOpenItems((items) => {
      const index = items.indexOf(item.ID)
      items.splice(index, 1)
      return items
    })
  }

  return childItems.length && opened ? (
    <ChildNav
      items={childItems}
      depth={depth}
      showItem={showItem}
      hideItem={hideItem}
      openedItems={openedItems}
      hasChildItems={hasChildItems}
    />
  ) : null
}

export default Nav
