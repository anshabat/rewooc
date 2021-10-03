import React, { FC, useEffect, useState } from 'react'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'
import { FilterChoiceValue } from 'app-services/orders'

export interface OrderFilterAttributes {
  status: string[]
  delivery: string[]
}

interface OrdersFilterProps {
  deliveryOptions: FilterChoiceValue[]
  statusOptions: FilterChoiceValue[]
  onFilter: (attributes: OrderFilterAttributes) => void
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, deliveryOptions, statusOptions } = props
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [activeDelivery, setActiveDeliveries] = useState<string[]>([])

  useEffect(() => {
    onFilter({ status: activeStatuses, delivery: activeDelivery })
  }, [activeStatuses.length, activeDelivery.length])

  return (
    <div className="rw-order-filter">
      <HorizontalFilter
        attributes={[
          {
            label: 'Status',
            valuesComponent: (
              <ChoiceList
                options={statusOptions}
                onChange={setActiveStatuses}
                defaultOptions={activeStatuses}
              />
            ),
            isApplied: Boolean(activeStatuses.length),
          },
          {
            label: 'Delivery',
            valuesComponent: (
              <ChoiceList
                options={deliveryOptions}
                onChange={setActiveDeliveries}
                defaultOptions={activeDelivery}
              />
            ),
            isApplied: Boolean(activeDelivery.length),
          },
        ]}
      />
    </div>
  )
}

export default OrdersFilter
