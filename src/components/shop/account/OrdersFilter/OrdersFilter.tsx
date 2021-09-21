import React, { FC, useEffect, useState } from 'react'
import { IDeliveryMethod } from 'app-api'
import { OrderStatus } from 'app-types'
import HorizontalFilter from '../../../UI/HorizontalFilter/HorizontalFilter'
import ChoiceList from '../../../UI/Form/ChoiceList/ChoiceList'

export interface OrderFilterAttributes {
  status: string[]
  delivery: string[]
}

interface OrdersFilterProps {
  deliveryValues: IDeliveryMethod[]
  statusValues: OrderStatus[]
  onFilter: (attributes: OrderFilterAttributes) => void
}

const OrdersFilter: FC<OrdersFilterProps> = (props) => {
  const { onFilter, deliveryValues, statusValues } = props
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])
  const [activeDelivery, setActiveDeliveries] = useState<string[]>([])

  const deliveryOptions = deliveryValues.map((d) => ({
    label: d.title,
    value: String(d.id),
  }))

  const statusOptions = statusValues.map((item) => ({
    label: item.value,
    value: item.key,
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
