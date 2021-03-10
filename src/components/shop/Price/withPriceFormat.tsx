import React from 'react'
import { useAppContext } from '../../../context/appContext'
import { IPriceFormat } from 'app-types'
import { IPriceValueFormat } from '../../../types/priceModel'

const formatValue = ({
  price,
  thousandSeparator = ' ',
  decimalSeparator = '.',
  decimals = 2,
}: IPriceValueFormat & { price: number }) => {
  const priceString = price.toFixed(decimals)
  const [integralPart, fractionalPart] = priceString.split('.')
  let reversedIntPrice = ''

  for (let i = integralPart.length - 1, caret = 0; i >= 0; i -= 1, caret += 1) {
    if (caret === 3) {
      reversedIntPrice += thousandSeparator
      caret = 0
    }
    reversedIntPrice += integralPart[i]
  }
  const resultIntegralPart = reversedIntPrice.split('').reverse().join('')

  return fractionalPart
    ? resultIntegralPart + decimalSeparator + fractionalPart
    : resultIntegralPart
}

const formatCurrency = ({ price, currency, format }) => {
  return format
    .replace('%2$s', price)
    .replace('&nbsp;', ' ')
    .replace('%1$s', currency)
}

const formatPrice = (options: IPriceFormat, value: number) => {
  return formatCurrency({
    price: formatValue({
      price: Number(value),
      thousandSeparator: options.thousandSeparator,
      decimalSeparator: options.decimalSeparator,
      decimals: options.decimals,
    }),
    currency: options.currencySymbol,
    format: options.priceFormat,
  })
}

export interface IWithPriceFormat {
  formatPrice: (value: number) => any
}

function withPriceFormat<T>(
  InitialComponent: React.ComponentType<T & IWithPriceFormat>
) {
  // TODO eslint this
  // eslint-disable-next-line react/display-name
  return (props: T): JSX.Element => {
    const { price } = useAppContext()

    return (
      <InitialComponent
        {...props}
        formatPrice={(value: number) => {
          return formatPrice(price, value)
        }}
      />
    )
  }
}

export default withPriceFormat
