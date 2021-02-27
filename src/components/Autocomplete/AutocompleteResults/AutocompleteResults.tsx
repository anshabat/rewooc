import './AutocompleteResults.scss'
import React, { Component } from 'react'
import { IProduct } from 'app-types'
import { siteUrl } from '../../../shared/utilities'

interface IProps {
  posts: IProduct[]
  getActiveItemRef: (elem: HTMLAnchorElement) => void
  cursor: number
  close: (e: any) => void
  onLinkHover: (e: React.MouseEvent, index: number) => void
}

class AutocompleteResults extends Component<IProps> {
  componentDidMount(): void {
    const { close } = this.props
    document.addEventListener('click', close, true)
  }

  componentWillUnmount(): void {
    const { close } = this.props
    document.removeEventListener('click', close, true)
  }

  render(): JSX.Element {
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
