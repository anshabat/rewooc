import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Autocomplete from './Autocomplete'
import { catalogApi } from 'api'
import { products } from 'test/productsMock'

function isItemActive(element: HTMLElement): boolean {
  return element.classList.contains('rw-autocomplete-results__item--active')
}

describe('<Autocomplete />', () => {
  let searchProducts: jest.SpyInstance
  let input: HTMLElement

  beforeEach(() => {
    jest.useFakeTimers()
    searchProducts = jest.spyOn(catalogApi, 'searchProducts')
    searchProducts.mockResolvedValue(products)
    render(<Autocomplete delay={1000} minChars={3} limit={6} />)
    input = screen.getByRole('textbox')
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should call searchProducts after delay if value >= minChars', async () => {
    fireEvent.input(input, { target: { value: 'app' } })

    expect(searchProducts).toHaveBeenCalledTimes(0)
    jest.advanceTimersByTime(1000)
    await Promise.resolve()

    expect(searchProducts).toHaveBeenCalledTimes(1)
    expect(searchProducts).toHaveBeenCalledWith('app', 6)
  })

  it('should not call searchProducts if value < minChars', async () => {
    fireEvent.input(input, { target: { value: 'ap' } })
    jest.runAllTimers()
    await Promise.resolve()

    expect(searchProducts).toHaveBeenCalledTimes(0)
  })

  it('should output list items', async () => {
    expect(screen.queryByRole('list')).not.toBeInTheDocument()  
    
    fireEvent.input(input, { target: { value: 'app' } })
    jest.runAllTimers()
    await Promise.resolve()
    const list = await screen.findAllByRole('listitem')
    
    expect(list).toHaveLength(2)
  })

  it('should move between items on mouse down an up', async () => {
    expect(screen.queryByRole('list')).not.toBeInTheDocument()

    fireEvent.input(input, { target: { value: 'app' } })
    jest.runAllTimers()
    await Promise.resolve()

    const list = await screen.findAllByRole('listitem')
    
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 })
    expect(isItemActive(list[0])).toBeTruthy()
    expect(isItemActive(list[1])).toBeFalsy()

    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 })
    expect(isItemActive(list[0])).toBeFalsy()
    expect(isItemActive(list[1])).toBeTruthy()

    fireEvent.keyDown(input, { key: 'ArrowUp', keyCode: 38 })
    expect(isItemActive(list[0])).toBeTruthy()
    expect(isItemActive(list[1])).toBeFalsy()

    fireEvent.keyDown(input, { key: 'ArrowUp', keyCode: 38 })
    expect(isItemActive(list[0])).toBeFalsy()
    expect(isItemActive(list[1])).toBeTruthy()
  })

  it('should close autocomplete after pressing Esc key', async () => {
    expect(screen.queryByRole('list')).not.toBeInTheDocument()

    fireEvent.input(input, { target: { value: 'app' } })
    jest.runAllTimers()
    await Promise.resolve()
    const list = await screen.findByRole('list')

    fireEvent.keyDown(input, { key: 'Escape', keyCode: 27 })

    expect(list).not.toBeInTheDocument()
  })
})
