import React, { FC } from 'react'
import { Link } from 'react-router-dom'
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
          <li key={order.id}>
            <Link to={`/my-account/view-order/${order.id}`}>
              {order.number}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Orders
