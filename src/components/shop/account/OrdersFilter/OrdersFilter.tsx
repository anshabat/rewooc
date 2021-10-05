import React, { FC, ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import {
  FilterAttributeValue,
  IFilterAttributes,
} from 'app-services/orders/types'
import FilterFactory from '../../../UI/FilterFactory/FilterFactory'

export interface ISelectedAttributes {
  [key: string]: string[]
}

interface IFilterAttributeComponent {
  label: string
  valuesComponent: ReactElement
  isApplied: boolean
}

const getInitialValues = (
  attributes: IFilterAttributes<{ status: any; delivery: any }>
) => {
  return Object.keys(attributes).reduce<ISelectedAttributes>((acc, attr) => {
    acc[attr] = []
    return acc
  }, {})
}

interface OrdersFilterProps {
  attributes: IFilterAttributes<{ status: any; delivery: any }>
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

  const attributeComponents = Object.entries<FilterAttributeValue>(
    attributes
  ).map<IFilterAttributeComponent>((attr) => {
    const [key, data] = attr
    return {
      label: data.label,
      valuesComponent: (
        <FilterFactory
          values={values[key]}
          attribute={data}
          onApply={(newValues) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            updateActiveAttributes(key, newValues)
          }}
        />
      ),
      isApplied: Boolean(values[key].length),
    }
  })

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={attributeComponents} />
    </div>
  )
}

export default OrdersFilter
