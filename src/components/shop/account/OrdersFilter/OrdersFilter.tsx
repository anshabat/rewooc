import React, { FC, ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import { IFilterAttributes } from 'app-services/orders/types'
import FilterFactory from '../../../UI/FilterFactory/FilterFactory'

//TODO limit string to status | delivery
export interface ISelectedAttributes {
  [key: string]: string[]
}

interface IFilterAttributeComponent {
  label: string
  valuesComponent: ReactElement
  isApplied: boolean
}

interface IProps<T> {
  attributes: IFilterAttributes<keyof T>[]
  onFilter: (attributes: T) => void
  attributesValues: T
}

function OrdersFilter<T>(props: IProps<T>): ReactElement {
  const { onFilter, attributes, attributesValues } = props
  const [values, setValues] = useState<T>(attributesValues)

  useEffect(() => {
    onFilter(values)
  }, [values])

  const updateActiveAttributes = (newValues: T) => {
    setValues((prev) => ({ ...prev, ...newValues }))
  }

  const attributeComponents = attributes.map<IFilterAttributeComponent>(
    (attr) => {
      return {
        label: attr.label,
        valuesComponent: (
          <FilterFactory
            values={values[attr.key]}
            attribute={attr}
            onApply={(newValues) => {
              updateActiveAttributes({ [attr.key]: newValues })
            }}
          />
        ),
        isApplied: Boolean(values[attr.key].length),
      }
    }
  )

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={attributeComponents} />
    </div>
  )
}

export default OrdersFilter
