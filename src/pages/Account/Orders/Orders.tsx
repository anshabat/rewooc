import React, { FC } from 'react'
import withPageData from '../../withPageData'
import { IOrder } from 'app-types'

interface IPageData {
  orders: IOrder[]
}

const Orders: FC<IPageData> = (props) => {
  const { orders } = props

  return (
    <div>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>{order.number}</li>
        ))}
      </ul>
    </div>
  )
}

export default withPageData<IPageData>(Orders)
