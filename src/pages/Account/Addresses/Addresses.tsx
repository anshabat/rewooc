import React, { FC } from 'react'
import { IUserAddress } from 'app-types'
import withPageData from '../../withPageData'

const Addresses: FC<IUserAddress> = (props) => {
  return <div>{props.address}</div>
}

export default withPageData(Addresses)
