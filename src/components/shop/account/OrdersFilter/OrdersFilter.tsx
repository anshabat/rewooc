import React, { FC, useEffect, useState } from 'react'
import { IDeliveryMethod } from 'app-api'

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

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value)
    setActiveStatuses(values)
  }

  const changeDelivery = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value)
    setActiveDeliveries(values)
  }

  useEffect(() => {
    onFilter({ status: activeStatuses, delivery: activeDelivery })
  }, [activeStatuses.length, activeDelivery.length])

  return (
    <div className="rw-order-filter">
      <select onChange={changeStatus} multiple>
        {statuses.map((status) => {
          return (
            <option value={status} key={status}>
              {status}
            </option>
          )
        })}
      </select>
      <select onChange={changeDelivery} multiple>
        {deliveryValues.map((delivery) => {
          return (
            <option value={delivery.id} key={delivery.id}>
              {delivery.title}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default OrdersFilter
