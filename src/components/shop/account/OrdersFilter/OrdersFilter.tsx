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

interface IProps {
  attributes: IFilterAttributes<'status' | 'delivery'>[]
  onFilter: (attributes: ISelectedAttributes) => void
  attributesValues: ISelectedAttributes
}

const OrdersFilter: FC<IProps> = (props) => {
  const { onFilter, attributes, attributesValues } = props
  const [values, setValues] = useState<ISelectedAttributes>(attributesValues)

  useEffect(() => {
    onFilter(values)
  }, [values])

  const updateActiveAttributes = (newValues: ISelectedAttributes) => {
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
              updateActiveAttributes(newValues)
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
