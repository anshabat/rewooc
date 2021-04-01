import './AutocompleteResults.scss'
import React, { FC, useEffect } from 'react'
import { IProduct } from 'app-types'
import { siteUrl } from '../../../shared/utilities'

interface IProps {
  posts: IProduct[]
  getActiveItemRef: (elem: HTMLAnchorElement) => void
  cursor: number
  close: (e: any) => void
  onLinkHover: (e: React.MouseEvent, index: number) => void
}

const AutocompleteResults: FC<IProps> = (props) => {
  const { posts, cursor, getActiveItemRef, onLinkHover, close } = props

  useEffect(() => {
    document.addEventListener('click', close, true)
    return () => {
      document.removeEventListener('click', close, true)
    }
  }, [])

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

export default AutocompleteResults
