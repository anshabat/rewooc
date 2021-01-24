import './AutocompleteResults.scss'
import React, { Component } from 'react'
import { siteUrl } from '../../../shared/utilities'

class AutocompleteResults extends Component {
  componentDidMount() {
    const { close } = this.props
    document.addEventListener('click', close, true)
  }

  componentWillUnmount() {
    const { close } = this.props
    document.removeEventListener('click', close, true)
  }

  render() {
    const { posts, cursor, getActiveItemRef, onLinkHover } = this.props

    return (
      <ul className="rw-autocomplete-results">
        {posts.map((post, index) => {
          const active =
            cursor === index ? 'rw-autocomplete-results__item--active' : ''
          return (
            <li
              className={`rw-autocomplete-results__item ${active}`}
              key={post.id}
            >
              <a
                className="rw-autocomplete-results__link"
                href={siteUrl(post.link)}
                ref={(elem) => {
                  if (active && elem) {
                    getActiveItemRef(elem)
                  }
                }}
                onMouseOver={(e) => onLinkHover(e, index)}
              >
                {post.title} ({post.price})
              </a>
            </li>
          )
        })}
      </ul>
    )
  }
}

export default AutocompleteResults
