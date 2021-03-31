import React, { FC } from 'react'
import { usePageData } from '../../../hooks/usePageData'
import { IOrder } from 'app-types'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'

interface IPageData {
  orders: IOrder[]
}

const Orders: FC = () => {
  const data = usePageData<IPageData>()

  if (!data) return <ContentLoader />

  const { orders } = data

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

export default Orders
