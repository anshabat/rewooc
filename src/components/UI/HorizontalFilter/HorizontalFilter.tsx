import './HorizontalFilter.scss'
import React, { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import Icon from '../Icon/Icon'
import classNames from 'classnames'
import { IFilterComponent } from 'app-services/orders'

interface HorizontalFilterProps {
  attributes: IFilterComponent[]
  onClear?: (e: MouseEvent<HTMLButtonElement>) => void
}

const HorizontalFilter: FC<HorizontalFilterProps> = (props) => {
  const { attributes, onClear } = props
  const [openedAttribute, setOpenedAttribute] = useState<number | null>(null)

  const listItemRefs: React.MutableRefObject<any>[] = []
  attributes.forEach((attr, index) => {
    listItemRefs[index] = useRef<any>()
  })

  const isFilterApplied = attributes.some((attribute) => attribute.isApplied)

  const clickOutsideFilterHandler = (e: any) => {
    const clickedInside = listItemRefs.some((i) => i.current.contains(e.target))
    if (!clickedInside) {
      setOpenedAttribute(null)
    }
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
          const attributeClasses = classNames(
            'rw-horizontal-filter__attribute',
            {
              'rw-horizontal-filter__attribute--active': attribute.isApplied,
            }
          )
          return (
            <li
              ref={listItemRefs[index]}
              className={attributeClasses}
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
      {isFilterApplied ? (
        <button className="rw-horizontal-filter__clear" onClick={onClear}>
          Clear
        </button>
      ) : null}
    </nav>
  )
}

export default HorizontalFilter
