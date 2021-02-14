import React, { FC } from 'react'
import withPageData from '../../withPageData'
import { UserAddress } from '../../../types/Account'

const Addresses: FC<UserAddress> = (props) => {
  return <div>{props.address}</div>
}

export default withPageData<UserAddress>(Addresses)
