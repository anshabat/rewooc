import React, { FC, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { IFilterAttributes } from 'app-services/orders/types'

export interface ISelectedAttributes {
  [key: string]: string[]
}

interface OrdersFilterProps {
  attributes: IFilterAttributes
  onFilter: (attributes: ISelectedAttributes) => void
}

const getInitialValues = (attributes: IFilterAttributes) => {
  return Object.keys(attributes).reduce<ISelectedAttributes>((acc, attr) => {
    acc[attr] = []
    return acc
  }, {})
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, attributes } = props
  const initialValues = getInitialValues(attributes)
  const [values, setValues] = useState<ISelectedAttributes>(initialValues)

  useEffect(() => {
    onFilter(values)
  }, [values])

  const updateActiveAttributes = (
    type: 'status' | 'delivery',
    values: string[]
  ) => {
    setValues((prev) => ({
      ...prev,
      [type]: values,
    }))
  }

  // TODO make dynamic with attributes prop
  const newAttributes = [
    {
      label: 'Status',
      valuesComponent: (
        <ChoiceList
          options={attributes.status.values}
          onChange={(values) => {
            updateActiveAttributes('status', values)
          }}
          defaultOptions={values.status}
        />
      ),
      isApplied: Boolean(values.status.length),
    },
    {
      label: 'Delivery',
      valuesComponent: (
        <ChoiceList
          options={attributes.delivery.values}
          onChange={(values) => {
            updateActiveAttributes('delivery', values)
          }}
          defaultOptions={values.delivery}
        />
      ),
      isApplied: Boolean(values.delivery.length),
    },
  ]

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={newAttributes} />
    </div>
  )
}

export default OrdersFilter
