import React, { FC } from 'react'
import { usePageData } from '../../../hooks/usePageData'
import { IOrder } from 'types'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'
import { useAccountContext } from '../../../context/accountContext'
import OrdersList from '../../../components/shop/account/OrdersList/OrdersList'
import ErrorBoundary from '../../../components/errorBoundaries/ErrorBoundary'

interface IPageData {
  orders: IOrder[]
  title: string
}

const Orders: FC = () => {
  const data = usePageData<IPageData>()
  useAccountContext(data?.title)

  if (!data) return <ContentLoader />

  const { orders } = data
  
  return (
    <ErrorBoundary>
      <OrdersList orders={orders} />
    </ErrorBoundary>
  )
}

export default Orders
