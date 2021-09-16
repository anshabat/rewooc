import './HorizontalFilter.scss'
import React, { FC, ReactElement } from 'react'

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

  return (
    <nav className="rw-horizontal-filter">
      <ul className="rw-horizontal-filter__attributes-list">
        {attributes.map((attribute) => {
          return <li className="rw-horizontal-filter__attribute" key={attribute.label}>{attribute.label}</li>
        })}
      </ul>
      <button className="rw-horizontal-filter__clear">Clear</button>
    </nav>
  )
}

export default HorizontalFilter
