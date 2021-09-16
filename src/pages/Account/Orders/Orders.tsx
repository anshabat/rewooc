import React, { FC } from 'react'
import { usePageData } from '../../../hooks/usePageData'
import { IOrder } from 'app-types'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'
import { useAccountContext } from '../../../context/accountContext'
import OrdersList from '../../../components/shop/account/OrdersList/OrdersList'

interface IPageData {
  orders: IOrder[]
  title: string
}

const Orders: FC = () => {
  const data = usePageData<IPageData>()
  useAccountContext(data?.title)

  if (!data) return <ContentLoader />

  const { orders } = data

  return <OrdersList orders={orders} />
}

export default Orders
