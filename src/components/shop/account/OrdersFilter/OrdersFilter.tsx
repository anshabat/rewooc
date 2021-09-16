import React, { FC, useEffect, useState } from 'react'

export interface OrderFilterAttributes {
  status: string[]
}

interface OrdersFilterProps {
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
  const { onFilter } = props
  const [activeStatuses, setActiveStatuses] = useState<string[]>([])

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(e.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value)
    setActiveStatuses(values)
  }

  useEffect(() => {
    onFilter({ status: activeStatuses })
  }, [activeStatuses.length])

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
    </div>
  )
}

export default OrdersFilter
