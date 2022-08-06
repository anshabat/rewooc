import React from 'react'
import userEvent from '@testing-library/user-event'
import { fireEvent, render, screen } from '@testing-library/react'
import Dialog from './Dialog'

describe('<Dialog /> component', () => {
  it('should be hidden if isOpened is false', () => {
    const { queryByRole } = render(<Dialog isOpened={false} />)
    expect(queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('should be visible if isOpened is true', () => {
    const { getByRole } = render(<Dialog isOpened={true} />)
    expect(getByRole('dialog')).toBeInTheDocument()
  })

  it('should display backdrop', () => {
    const { getByTestId } = render(<Dialog isOpened={true} />)
    expect(getByTestId('backdrop')).toBeInTheDocument()
  })

  it('should not be closed after clicking inside', () => {
    const { getByText, queryByRole } = render(
      <Dialog isOpened={true} title="Title" />
    )
    const title = getByText('Title')
    fireEvent.click(title)
    expect(queryByRole('dialog')).toBeInTheDocument()
  })

  it('should be closed after clicking on close button', () => {
    const closeHandler = jest.fn()
    const { getByRole } = render(
      <Dialog isOpened={true} title="Title" onClose={closeHandler} />
    )
    const closeButton = getByRole('button', { name: 'Close' })
    fireEvent.click(closeButton)
    expect(closeButton).toBeInTheDocument()
    expect(closeHandler).toBeCalledTimes(1)
  })

  it('should be closed after clicking outside', () => {
    const closeHandler = jest.fn()
    const { getByTestId } = render(
      <Dialog isOpened={true} title="Title" onClose={closeHandler} />
    )
    fireEvent.click(getByTestId('backdrop'))
    expect(closeHandler).toBeCalledTimes(1)
  })

  it('should be closed after pressing Esc key', () => {
    const closeHandler = jest.fn()
    render(<Dialog isOpened={true} title="Title" onClose={closeHandler} />)

    userEvent.keyboard('{esc}')

    expect(closeHandler).toBeCalledTimes(1)
  })
})
