import React, { ReactElement, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { FilterChoiceValue } from 'app-services/orders'
import { IFilterComponent } from 'app-services/orders/types'

interface IProps {
  attributes: {delivery: FilterChoiceValue[], status: FilterChoiceValue[]}
  onFilter: (attributes: {delivery: string[], status: string[]}) => void
  attributesValues: {delivery: string[], status: string[]}
}

function OrdersFilter(props: IProps): ReactElement {
  const { onFilter, attributes, attributesValues } = props
  const [values, setValues] = useState(attributesValues)

  useEffect(() => {
    onFilter(values)
  }, [values])

  const updateActiveAttributes = (newValues: any) => {
    setValues((prev) => ({ ...prev, ...newValues }))
  }

  const attributeComponents: IFilterComponent[] = [
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

  return (
    <div className="rw-order-filter">
      <HorizontalFilter attributes={attributeComponents} />
    </div>
  )
}

export default OrdersFilter
