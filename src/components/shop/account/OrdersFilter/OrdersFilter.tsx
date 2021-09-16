import React, { FC, useEffect, useState } from 'react'

export interface OrderFilterAttributes {
  status: string
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
  const [activeStatus, setActiveStatus] = useState('')

  const changeStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setActiveStatus(e.target.value)
  }

  useEffect(() => {
    onFilter({ status: activeStatus })
  }, [activeStatus])

  return (
    <div className="rw-order-filter">
      <select onChange={changeStatus}>
        <option value="">All statuses</option>
        {statuses.map((status) => {
          return (
            <option value={status} key={status} defaultValue={activeStatus}>
              {status}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default OrdersFilter
