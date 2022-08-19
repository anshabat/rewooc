import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import App from 'App'
import { getAppData } from 'test/appDataMocks'
import { renderWithStore, tick } from 'test/testHelpers'
import store from 'redux/store'
import { appApi, authApi } from 'api'

jest.mock('pages/Home/Home', () => {
  return function MockName() {
    return <div>Fake component</div>
  }
})

describe('SignIn page test', () => {
  it('should correctly send data and display error', async () => {
    const fetchCurrentUser = jest.spyOn(authApi, 'fetchCurrentUser')
    const fetchGeneralData = jest.spyOn(appApi, 'fetchGeneralData')
    fetchGeneralData.mockResolvedValue(getAppData())

    const component = renderWithStore(<App />, { store: store })

    //Initially Loader & Go to "Sign in" page
    const loader = component.getByRole('progressbar', { name: 'Page loader' })
    expect(loader).toBeInTheDocument()
    const signInLink = await component.findByRole('link', { name: 'Sign in' })
    fireEvent.click(signInLink)

    //Submit with correct data
    fetchCurrentUser.mockResolvedValueOnce('token')
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Username or email' }),
      { target: { value: 'admin' } }
    )
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(fetchCurrentUser).toHaveBeenCalledWith('admin', 'pass')

    //Show Error message if response success false
    fetchCurrentUser.mockRejectedValueOnce('error')
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await component.findByLabelText('Error')).toBeInTheDocument()

    //Hide Error message if response success true
    fetchCurrentUser.mockResolvedValueOnce('token')
    expect(component.queryByLabelText('Error')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    await tick()
    expect(component.queryByLabelText('Error')).not.toBeInTheDocument()
  })
})
