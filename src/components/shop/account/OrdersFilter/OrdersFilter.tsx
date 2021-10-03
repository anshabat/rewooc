import React, { FC, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { FilterAttribute } from 'app-services/orders/types'

/*export interface SelectedAttributes {
  status: string[]
  delivery: string[]
}*/

export interface ISelectedAttributes {
  [key: string]: string[]
}

interface OrdersFilterProps {
  attributes: FilterAttribute
  onFilter: (attributes: ISelectedAttributes) => void
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, attributes } = props
  const initialValues = Object.keys(attributes).reduce<ISelectedAttributes>(
    (acc, attr) => {
      acc[attr] = []
      return acc
    },
    {}
  )

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

  return (
    <div className="rw-order-filter">
      <HorizontalFilter
        attributes={[
          {
            label: 'Status',
            valuesComponent: (
              <ChoiceList
                options={attributes.status}
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
                options={attributes.delivery}
                onChange={(values) => {
                  updateActiveAttributes('delivery', values)
                }}
                defaultOptions={values.delivery}
              />
            ),
            isApplied: Boolean(values.delivery.length),
          },
        ]}
      />
    </div>
  )
}

export default OrdersFilter
