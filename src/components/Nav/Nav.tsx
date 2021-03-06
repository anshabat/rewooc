import './Nav.scss'
import React, { Component, ReactNode } from 'react'
import { INavItem } from '../../types/navigationModel'

interface IProps {
  items?: INavItem[]
  navs: ReactNode[]
  parentId: number,
  depth: number,
  opened: boolean,
}

interface IState {
  openedItems: number[]
}

let allItems: INavItem[] = []
let allNavs: ReactNode[] = []

class Nav extends Component<IProps, IState> {
  childItems: INavItem[]
  ChildNav: ReactNode

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

  hasChildItems(item) {
    return allItems.some((i) => Number(i.menu_item_parent) === item.ID)
  }

  showItem(item) {
    if (!this.hasChildItems(item)) {
      return
    }
    this.setState((prevState) => {
      prevState.openedItems.push(item.ID)
      return { openedItems: prevState.openedItems }
    })
  }

  hideItem(item) {
    if (!this.hasChildItems(item)) {
      return
    }
    this.setState((prevState) => {
      const index = prevState.openedItems.indexOf(item.ID)
      prevState.openedItems.splice(index, 1)
      return { openedItems: prevState.openedItems }
    })
  }

  render() {
    const { opened, parentId, depth } = this.props
    const { openedItems } = this.state

    return this.childItems.length && opened ? (
      <this.ChildNav
        items={this.childItems}
        parentId={parentId}
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
