import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import withPageData from '../../withPageData'
import { UserAddress } from '../../../types/Account'

const Addresses: FC<UserAddress & RouteComponentProps> = (props) => {
  return <div>{props.address}</div>
}

export default withPageData<UserAddress>(Addresses)
