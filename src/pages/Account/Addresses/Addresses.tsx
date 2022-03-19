import React, { FC } from 'react'
import { IUserAddress } from 'types'
import { usePageData } from '../../../hooks/usePageData'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'
import { useAccountContext } from '../../../context/accountContext'

interface IUserAddressPage extends IUserAddress {
  title: string
}

const Addresses: FC = () => {
  const data = usePageData<IUserAddressPage>()
  useAccountContext(data?.title)

  if (!data) return <ContentLoader />

  const { address } = data

  return <div>{address}</div>
}

export default Addresses
