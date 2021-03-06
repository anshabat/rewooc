import './Phone.scss'
import React, { FC } from 'react'

interface IProps {
  phoneNumber: string
}

const Phone: FC<IProps> = ({ phoneNumber }) => <div>{phoneNumber}</div>

export default Phone
