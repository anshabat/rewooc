import './Price.scss'
import React from 'react'
import withPriceFormat from './withPriceFormat'

const Price = (props) => {
  const { formatPrice, value } = props
  return (
    <div className="rw-price">
      <div className="rw-price__value">{formatPrice(value)}</div>
    </div>
  )
}

export default withPriceFormat(Price)
