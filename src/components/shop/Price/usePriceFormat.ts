import { IPriceFormat } from 'app-types'
import { useAppContext } from '../../../context/appContext'

const formatPrice = (options: IPriceFormat, value: number) => {
  const {
    thousandSeparator = ' ',
    decimalSeparator = '.',
    decimals = 2,
    currencySymbol,
    priceFormat,
  } = options

  const decimalValue = Number(value).toFixed(decimals)
  const [integralPart, fractionalPart] = decimalValue.split('.')
  let reversedIntPrice = ''

  for (let i = integralPart.length - 1, caret = 0; i >= 0; i -= 1, caret += 1) {
    if (caret === 3) {
      reversedIntPrice += thousandSeparator
      caret = 0
    }
    reversedIntPrice += integralPart[i]
  }
  const resultIntegralPart = reversedIntPrice.split('').reverse().join('')

  const formattedValue = fractionalPart
    ? resultIntegralPart + decimalSeparator + fractionalPart
    : resultIntegralPart

  return priceFormat
    .replace('%2$s', formattedValue)
    .replace('&nbsp;', ' ')
    .replace('%1$s', currencySymbol)
}

export function usePriceFormat(value: number): string {
  const { price: priceOptions } = useAppContext()
  return formatPrice(priceOptions, value)
}
