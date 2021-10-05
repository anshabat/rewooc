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

const getInitialValues = (
  //TODO accept 'status' | 'delivery' as generic, use it only once, best as HOOK generic
  attributes: IFilterAttributes<'status' | 'delivery'>[]
) => {
  return attributes.reduce<ISelectedAttributes>((acc, attr) => {
    acc[attr.key] = []
    return acc
  }, {})
}

interface OrdersFilterProps {
  attributes: IFilterAttributes<'status' | 'delivery'>[]
  onFilter: (attributes: ISelectedAttributes) => void
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, attributes } = props
  const initialValues = getInitialValues(attributes)
  const [values, setValues] = useState<ISelectedAttributes>(initialValues)

  useEffect(() => {
    onFilter(values)
  }, [values])

  const updateActiveAttributes = (
    // TODO fix static data
    type: 'status' | 'delivery',
    values: string[]
  ) => {
    setValues((prev) => ({
      ...prev,
      [type]: values,
    }))
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
              updateActiveAttributes(attr.key, newValues)
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
