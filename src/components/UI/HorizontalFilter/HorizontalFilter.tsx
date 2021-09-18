import './HorizontalFilter.scss'
import React, { FC, ReactElement, useEffect, useRef, useState } from 'react'
import Icon from '../Icon/Icon'

interface HorizontalFilterProps {
  attributes: {
    label: string
    applied?: boolean
    valuesComponent: ReactElement
  }[]
}

const HorizontalFilter: FC<HorizontalFilterProps> = (props) => {
  const { attributes } = props

  const isFilterApplies = attributes.some((attribute) => attribute.applied)

  const [openedAttribute, setOpenedAttribute] = useState<number | null>(null)
  const listItemRefs: React.MutableRefObject<any>[] = []
  attributes.forEach((attr, index) => {
    listItemRefs[index] = useRef<any>()
  })

  const clickOutsideFilterHandler = (e: any) => {
    const clickedInside = listItemRefs.some((i) => i.current.contains(e.target))
    setOpenedAttribute((prev) => (clickedInside ? prev : null))
  }

  useEffect(() => {
    document.body.addEventListener('click', clickOutsideFilterHandler)
    return () => {
      document.body.removeEventListener('click', clickOutsideFilterHandler)
    }
  }, [])

  const toggleAttributeVisibility = (index: number): void => {
    setOpenedAttribute((currentIndex) =>
      currentIndex === index ? null : index
    )
  }

  return (
    <nav className="rw-horizontal-filter">
      <ul className="rw-horizontal-filter__list">
        {attributes.map((attribute, index) => {
          return (
            <li
              ref={listItemRefs[index]}
              className="rw-horizontal-filter__attribute"
              key={attribute.label}
            >
              <button
                className="rw-horizontal-filter__label"
                onClick={() => {
                  toggleAttributeVisibility(index)
                }}
              >
                {attribute.label}
                <Icon name="fa-angle-down" />
              </button>
              {index === openedAttribute ? (
                <div className="rw-horizontal-filter__dropdown">
                  {attribute.valuesComponent}
                </div>
              ) : null}
            </li>
          )
        })}
      </ul>
      <button className="rw-horizontal-filter__clear">Clear</button>
    </nav>
  )
}

export default HorizontalFilter
