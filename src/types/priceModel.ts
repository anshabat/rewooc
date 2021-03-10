export interface IPriceFormat extends IPriceValueFormat {
  currencySymbol: string
  priceFormat: string
}

export interface IPriceValueFormat {
  decimalSeparator: string
  decimals: number
  thousandSeparator: string
}
