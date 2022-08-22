import React from 'react'
import { render } from '@testing-library/react'
import ErrorBoundary from './ErrorBoundary'

function Bomb({ shouldThrow = false }) {
  if (shouldThrow) throw new Error('')
  else return null
}

describe('<ErrorBoundary />', () => {
  const consoleError = jest.spyOn(console, 'error')
  consoleError.mockReturnValue()

  afterAll(() => {
    consoleError.mockRestore()
  })

  it('should output error text and log error', () => {
    const { getByRole, rerender } = render(<Bomb />, {
      wrapper: ErrorBoundary as any,
    })
    rerender(<Bomb shouldThrow />)
    //1 - ReactDOM, 2 - jest-dom, 3 - custom
    expect(consoleError).toHaveBeenCalledTimes(3)
    expect(getByRole('alert').textContent).toMatchInlineSnapshot(
      `"Sorry.. there was an error"`
    )
  })
})
