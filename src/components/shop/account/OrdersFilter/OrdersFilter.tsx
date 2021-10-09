import React, { FC, ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import { IFilterAttributes } from 'app-services/orders/types'
import FilterFactory from '../../../UI/FilterFactory/FilterFactory'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'

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
  //attributes: IFilterAttributes<keyof T>[]
  attributes: any
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

  const attributeComponents = [
    {
      key: 'status',
      label: 'Status',
      valuesComponent: (
        <ChoiceList
          options={attributes.status}
          defaultOptions={values.status}
          onChange={(newValues) => {
            updateActiveAttributes({ status: newValues })
          }}
        />
      ),
      isApplied: Boolean(values.status.length),
    },
    {
      key: 'delivery',
      label: 'Delivery',
      valuesComponent: (
        <ChoiceList
          options={attributes.delivery}
          defaultOptions={values.delivery}
          onChange={(newValues) => {
            updateActiveAttributes({ delivery: newValues })
          }}
        />
      ),
      isApplied: Boolean(values.delivery.length),
    },
  ]

  /*const attributeComponents = attributes.map<IFilterAttributeComponent>(
    (attr) => {
      return {
        label: attr.label,
        valuesComponent: (
          <ChoiceList
            options={attr.values}
            defaultOptions={values[attr.key]}
            onChange={(newValues) => {
              updateActiveAttributes({ [attr.key]: newValues })
            }}
          />
        ),
        isApplied: Boolean(values[attr.key].length),
      }
    }
  )*/

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={attributeComponents} />
    </div>
  )
}

export default OrdersFilter
