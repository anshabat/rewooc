import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Autocomplete from './Autocomplete'
import { catalogApi } from 'api'

const products = [
  {
    addToCartUrl: 'http://localhost:8888/server/wp/product/64gb-xiaomi-mi-a1/',
    getStockQuantity: -3,
    id: 154,
    images: null,
    isSoldIndividually: false,
    link: 'http://localhost:8888/server/wp/product/64gb-xiaomi-mi-a1/',
    price: 345,
    title: '64GB Xiaomi Mi A1 Golden',
  },
  {
    addToCartUrl: '?add-to-cart=140',
    getStockQuantity: null,
    id: 140,
    images: null,
    isSoldIndividually: false,
    link: 'http://localhost:8888/server/wp/product/apple-iphone-8-64gb/',
    price: 356,
    title: 'Apple iPhone 8 64GB',
  },
]

fdescribe('<Autocomplete />', () => {

  beforeEach(() => {
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should call searchProducts after delay if value >= minChars', async () => {
    const searchProducts = jest.spyOn(catalogApi, 'searchProducts')
    searchProducts.mockResolvedValue(products)
    render(<Autocomplete delay={1000} minChars={3} limit={6} />)
    const input = screen.getByRole('textbox')

    fireEvent.input(input, { target: { value: 'app' } })

    expect(searchProducts).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(1000)
    await Promise.resolve()

    expect(searchProducts).toHaveBeenCalledTimes(1)
    expect(searchProducts).toHaveBeenCalledWith('app', 6)
  })

  it('should not call searchProducts if value < minChars', async () => {
    const searchProducts = jest.spyOn(catalogApi, 'searchProducts')
    searchProducts.mockResolvedValue(products)
    render(<Autocomplete delay={1000} minChars={3} limit={6} />)
    const input = screen.getByRole('textbox')
    fireEvent.input(input, { target: { value: 'ap' } })
    jest.runAllTimers()
    await Promise.resolve()

    expect(searchProducts).toHaveBeenCalledTimes(0)
  })

  // it('should go into link after pressing Enter key', () => {})

  // it('should close autocomplete after pressing Esc key', () => {})

  // it('should go to search results link on pressing Enter input focus')

  // it('should go to search results link on submit button')
})
