import React, { FC } from 'react'
import { IUserAddress } from 'app-types'
import { usePageData } from '../../../hooks/usePageData'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'

const Addresses: FC = () => {
  const data = usePageData<IUserAddress>()

  if (!data) return <ContentLoader />

  const { address } = data

  return <div>{address}</div>
}

export default Addresses
