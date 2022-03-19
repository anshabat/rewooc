import React from 'react'
import { usePageData } from '../../../hooks/usePageData'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'
import { IOrder } from 'types'

const ViewOrder = () => {
  const data = usePageData<IOrder>()

  if (!data) return <ContentLoader />

  return <div>This is order {data.id} page</div>
}

export default ViewOrder
