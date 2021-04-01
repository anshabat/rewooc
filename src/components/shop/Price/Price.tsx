import './Price.scss'
import React, { FC } from 'react'
import { usePriceFormat } from './usePriceFormat'

interface IProps {
  value: number
}

const Price: FC<IProps> = (props) => {
  const { value } = props
  const formattedValue = usePriceFormat(value)

  return (
    <div className="rw-price">
      <div className="rw-price__value">{formattedValue}</div>
    </div>
  )
}

export default Price
