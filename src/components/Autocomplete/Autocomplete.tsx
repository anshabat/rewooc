import './Autocomplete.scss'
import React, { Component } from 'react'
import { catalogApi } from 'app-data'
import { IProduct } from 'app-types'
import AutocompleteResults from './AutocompleteResults/AutocompleteResults'
import AutocompleteField from './AutocompleteField/AutocompleteField'

const KEY_CODE = {
  esc: 27,
  enter: 13,
  up: 38,
  down: 40,
}

interface IProps {
  delay: number
  minChars: number
  limit: number
}

interface IState {
  posts: IProduct[]
  cursor: number
}

class Autocomplete extends Component<IProps, IState> {
  //NodeJS.Timeout | null
  private timerId: any
  private containerRef: HTMLElement | null
  private activeItemRef: HTMLAnchorElement | null

  static defaultProps = {
    delay: 500,
    minChars: 3,
    limit: 10,
  }

  constructor(props: IProps) {
    super(props)
    this.state = {
      posts: [],
      cursor: -1,
    }

    this.timerId = null
    this.containerRef = null
    this.activeItemRef = null

    this.getItems = this.getItems.bind(this)
    this.searchItems = this.searchItems.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
    this.iterateResults = this.iterateResults.bind(this)
    this.closeResults = this.closeResults.bind(this)
    this.getActiveItemRef = this.getActiveItemRef.bind(this)
    this.onLinkHover = this.onLinkHover.bind(this)
  }

  onKeyDown(e: React.KeyboardEvent): void {
    switch (e.keyCode) {
      case KEY_CODE.up:
      case KEY_CODE.down:
        this.iterateResults(e)
        break
      case KEY_CODE.enter:
        if (this.activeItemRef) {
          this.activeItemRef.click()
        }
        break
      case KEY_CODE.esc:
        this.closeResults(e)
        break
      default:
    }
  }

  onLinkHover(e: React.MouseEvent, index: number): void {
    this.setState({ cursor: index })
  }

  getItems(value: string): void {
    const { limit } = this.props
    catalogApi.searchProducts(value, limit).then((products) => {
      this.setState({ posts: products })
    })
  }

  getActiveItemRef(elem: HTMLAnchorElement): void {
    this.activeItemRef = elem
  }

  delay(ms: number): Promise<void> {
    return new Promise((resolve) => {
      if (this.timerId) {
        clearTimeout(this.timerId)
      }
      this.timerId = setTimeout(() => {
        resolve()
      }, ms)
    })
  }

  searchItems(event: React.ChangeEvent<HTMLInputElement>): void {
    const { delay, minChars } = this.props
    const { value } = event.target
    event.persist()
    this.delay(delay).then(() => {
      if (value.length >= minChars) {
        this.getItems(value)
      }
    })
  }

  iterateResults(e: React.KeyboardEvent): void {
    e.persist()
    e.preventDefault()
    const shift = e.keyCode === KEY_CODE.up ? -1 : +1
    this.setState((prev) => {
      const cursor =
        prev.cursor <= 0 && e.keyCode === KEY_CODE.up
          ? prev.posts.length
          : prev.cursor
      return { cursor: (cursor + shift) % prev.posts.length }
    })
  }

  closeResults(e: any): void {
    if (!this.containerRef) {
      return
    }
    if (!this.containerRef.contains(e.target) || e.keyCode === KEY_CODE.esc) {
      this.setState({
        posts: [],
        cursor: -1,
      })
    }
  }

  render(): JSX.Element {
    const { posts, cursor } = this.state

    return (
      <div
        className="rw-autocomplete"
        ref={(el) => {
          this.containerRef = el
        }}
      >
        <div className="rw-autocomplete__field">
          <AutocompleteField
            onFieldInput={this.searchItems}
            onKeyDown={this.onKeyDown}
          />
        </div>
        {posts.length ? (
          <div className="rw-autocomplete__results">
            <AutocompleteResults
              posts={posts}
              getActiveItemRef={this.getActiveItemRef}
              cursor={cursor}
              close={this.closeResults}
              onLinkHover={this.onLinkHover}
            />
          </div>
        ) : null}
      </div>
    )
  }
}

export default Autocomplete
