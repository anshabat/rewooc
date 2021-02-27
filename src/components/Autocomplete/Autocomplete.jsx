import './Autocomplete.scss'
import React, { Component } from 'react'
import { catalogApi } from 'app-data'
import AutocompleteResults from './AutocompleteResults/AutocompleteResults'
import AutocompleteField from './AutocompleteField/AutocompleteField'

class Autocomplete extends Component {
  constructor(props) {
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

  onKeyDown(e) {
    switch (e.keyCode) {
      case 38:
      case 40:
        this.iterateResults(e)
        break
      case 13:
        this.activeItemRef.click()
        break
      case 27:
        this.closeResults(e)
        break
      default:
    }
  }

  onLinkHover(e, index) {
    this.setState({ cursor: index })
  }

  getItems(e) {
    const { limit } = this.props
    catalogApi.searchProducts(e.target.value, limit).then((products) => {
      this.setState({ posts: products })
    })
  }

  getActiveItemRef(elem) {
    this.activeItemRef = elem
  }

  delay(ms) {
    return new Promise((resolve) => {
      clearTimeout(this.timerId)
      this.timerId = setTimeout(() => {
        resolve()
      }, ms)
    })
  }

  searchItems(event) {
    const { delay, minChars } = this.props
    event.persist()
    this.delay(Number(delay)).then(() => {
      if (event.target.value.length >= minChars) {
        this.getItems(event)
      }
    })
  }

  iterateResults(e) {
    e.persist()
    e.preventDefault()
    const shift = e.keyCode === 38 ? -1 : +1
    this.setState((prev) => {
      const cursor =
        prev.cursor <= 0 && e.keyCode === 38 ? prev.posts.length : prev.cursor
      return { cursor: (cursor + shift) % prev.posts.length }
    })
  }

  closeResults(e) {
    if (!this.containerRef.contains(e.target) || e.keyCode === 27) {
      this.setState({
        posts: [],
        cursor: -1,
      })
    }
  }

  render() {
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

Autocomplete.defaultProps = {
  delay: 500,
  minChars: 3,
  limit: 10,
}

export default Autocomplete
