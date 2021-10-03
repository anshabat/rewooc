import React, { FC, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { FilterChoiceValue } from 'app-services/orders'
import { FilterAttribute } from 'app-services/orders/types'

export interface SelectedAttributes {
  status: string[]
  delivery: string[]
}

interface OrdersFilterProps {
  attributes: FilterAttribute
  onFilter: (attributes: SelectedAttributes) => void
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, attributes } = props
  /*const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [activeDelivery, setActiveDeliveries] = useState<string[]>([])*/
  const [
    selectedAttributes,
    setSelectedAttributes,
  ] = useState<SelectedAttributes>({
    status: [],
    delivery: [],
  })

  useEffect(() => {
    onFilter({
      status: selectedAttributes.status,
      delivery: selectedAttributes.delivery,
    })
  }, [selectedAttributes])

  const updateActiveAttributes = (
    type: 'status' | 'delivery',
    values: string[]
  ) => {
    setSelectedAttributes((prev) => ({
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
                defaultOptions={selectedAttributes.status}
              />
            ),
            isApplied: Boolean(selectedAttributes.status.length),
          },
          {
            label: 'Delivery',
            valuesComponent: (
              <ChoiceList
                options={attributes.delivery}
                onChange={(values) => {
                  updateActiveAttributes('delivery', values)
                }}
                defaultOptions={selectedAttributes.delivery}
              />
            ),
            isApplied: Boolean(selectedAttributes.delivery.length),
          },
        ]}
      />
    </div>
  )
}

export default OrdersFilter
