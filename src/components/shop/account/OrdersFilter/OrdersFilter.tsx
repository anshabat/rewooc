import React, { FC, useEffect, useState } from 'react'
import { IDeliveryMethod } from 'app-api'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'

export interface OrderFilterAttributes {
  status: string[]
  delivery: string[]
}

interface OrdersFilterProps {
  deliveryValues: IDeliveryMethod[]
  onFilter: (attributes: OrderFilterAttributes) => void
}

const statuses = [
  'pending',
  'processing',
  'on-hold',
  'completed',
  'cancelled',
  'refunded',
  'failed',
]

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, deliveryValues } = props
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [activeDelivery, setActiveDeliveries] = useState<string[]>([])

  const deliveryOptions = deliveryValues.map((d) => ({
    label: d.title,
    value: String(d.id),
  }))

  const statusOptions = statuses.map((s) => ({
    label: s,
    value: s,
  }))

  useEffect(() => {
    onFilter({ status: activeStatuses, delivery: activeDelivery })
  }, [activeStatuses.length, activeDelivery.length])

  return (
    <div className="rw-order-filter">
      <HorizontalFilter
        attributes={[
          {
            label: 'Status',
            applied: false,
            valuesComponent: (
              <ChoiceList
                options={statusOptions}
                onChange={setActiveStatuses}
                defaultOptions={activeStatuses}
              />
            ),
          },
          {
            label: 'Delivery',
            applied: false,
            valuesComponent: (
              <ChoiceList
                options={deliveryOptions}
                onChange={setActiveDeliveries}
                defaultOptions={activeDelivery}
              />
            ),
          },
        ]}
      />
    </div>
  )
}

export default OrdersFilter
