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
  const fetchCurrentUser = jest.spyOn(authApi, 'fetchCurrentUser')
  const fetchGeneralData = jest.spyOn(appApi, 'fetchGeneralData')

  it('should correctly send data and display error', async () => {
    fetchGeneralData.mockResolvedValue(getAppData())

    const component = renderWithStore(<App />, { store: store })

    //Initially Loader & Go to "Sign in" page
    const loader = component.getByRole('progressbar', { name: 'Page loader' })
    expect(loader).toBeInTheDocument()
    const signInLink = await component.findByRole('link', { name: 'Sign in' })
    fireEvent.click(signInLink)

    //Submit form with correct data
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
    expect(fetchGeneralData).toHaveBeenCalledTimes(3)
  })

  it('should redirect to homepage if user is logged in', async () => {
    const generalData = getAppData({
      user: {
        id: 1,
        firstName: 'Admin',
        displayName: 'admin',
        lastName: '',
        email: 'test@test.com',
      },
    })
    fetchGeneralData.mockResolvedValue(generalData)

    const component = renderWithStore(<App />, { store: store })
    await tick()

    const signInLink = component.queryByRole('link', { name: 'Sign in' })
    expect(signInLink).not.toBeInTheDocument()
  })
})
