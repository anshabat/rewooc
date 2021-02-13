import React, { FC } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import withPageData from '../../withPageData'
import { UserAddress } from '../../../types/Account'

type PropsType = RouteComponentProps & UserAddress

const Addresses: FC<PropsType> = (props) => {
  return <div>{props.address}</div>
}

export default withPageData(Addresses)
