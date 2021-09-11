import React, { FC, useContext, useEffect } from 'react'
import { IUserAddress } from 'app-types'
import { usePageData } from '../../../hooks/usePageData'
import ContentLoader from '../../../components/UI/loaders/ContentLoader/ContentLoader'
import { AccountContext } from '../Account'

interface IUserAddressPage extends IUserAddress {
  title: string
}

const Addresses: FC = () => {
  const data = usePageData<IUserAddressPage>()

  const { title, setTitle } = useContext(AccountContext)

  useEffect(() => {
    setTitle(data?.title || title)
  }, [data, title])

  if (!data) return <ContentLoader />

  const { address } = data

  return <div>{address}</div>
}

export default Addresses
