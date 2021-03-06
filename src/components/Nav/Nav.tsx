import './Nav.scss'
import React, { Component, FC, ReactNode } from 'react'
import { INavItem } from '../../types/navigationModel'

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
  parentId: number,
  depth: number,
  opened: boolean,
}

interface IState {
  openedItems: number[]
}

let allItems: INavItem[] = []
let allNavs: FC<IChildNav>[] = []

class Nav extends Component<IProps, IState> {
  childItems: INavItem[]
  ChildNav: FC<IChildNav>

  static defaultProps = {
    parentId: 0,
    depth: 1,
    opened: true,
  }

  constructor(props: IProps) {
    super(props)
    /* Save origins in closure for reusing in component recursion */
    allItems = props.items || allItems
    allNavs = props.navs || allNavs

    this.childItems = allItems.filter(
      (item) => Number(item.menu_item_parent) === props.parentId
    )
    this.ChildNav = allNavs[props.depth - 1] || allNavs[allNavs.length - 1]
    this.state = {
      openedItems: [],
    }
  }

  hasChildItems(item: INavItem): boolean {
    return allItems.some((i) => Number(i.menu_item_parent) === item.ID)
  }

  showItem(item: INavItem): void {
    if (!this.hasChildItems(item)) {
      return
    }
    this.setState((prevState) => {
      prevState.openedItems.push(item.ID)
      return { openedItems: prevState.openedItems }
    })
  }

  hideItem(item: INavItem): void {
    if (!this.hasChildItems(item)) {
      return
    }
    this.setState((prevState) => {
      const index = prevState.openedItems.indexOf(item.ID)
      prevState.openedItems.splice(index, 1)
      return { openedItems: prevState.openedItems }
    })
  }

  render(): ReactNode {
    const { opened, depth } = this.props
    const { openedItems } = this.state

    return this.childItems.length && opened ? (
      <this.ChildNav
        items={this.childItems}
        depth={depth}
        showItem={this.showItem.bind(this)}
        hideItem={this.hideItem.bind(this)}
        openedItems={openedItems}
        hasChildItems={this.hasChildItems.bind(this)}
      />
    ) : null
  }
}

export default Nav
