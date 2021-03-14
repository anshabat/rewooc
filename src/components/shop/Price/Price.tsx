import './Price.scss'
import React, { FC } from 'react'
import withPriceFormat, { IWithPriceFormat } from './withPriceFormat'

interface IProps {
  value: number
}

const Price: FC<IProps & IWithPriceFormat> = (props) => {
  const { formatPrice, value } = props

  return (
    <div className="rw-price">
      <div className="rw-price__value">{formatPrice(value)}</div>
    </div>
  )
}

export default withPriceFormat<IProps>(Price)
