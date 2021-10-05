import React, { FC, ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import {
  FilterAttributeValue,
  IFilterAttributes,
} from 'app-services/orders/types'
import FormField from '../../../UI/Form/FormField/FormField'

export interface ISelectedAttributes {
  [key: string]: string[]
}

interface IFilterAttributeComponent {
  label: string
  valuesComponent: ReactElement
  isApplied: boolean
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

interface IFilterFactory {
  attribute: FilterAttributeValue
  values: string[]
  onApply: (values: string[]) => void
}

const FilterFactory: FC<IFilterFactory> = (props) => {
  const { attribute, values, onApply } = props
  switch (attribute.type) {
    case 'multichoice':
      return (
        <ChoiceList
          options={attribute.values}
          defaultOptions={values}
          onChange={(newValues) => {
            onApply(newValues)
          }}
        />
      )
    case 'range':
      return <FormField label={attribute.label} />
  }
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

  const attributeComponents = Object.entries(
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
