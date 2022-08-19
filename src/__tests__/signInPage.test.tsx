import React from 'react'
import { fireEvent, screen } from '@testing-library/react'
import App from 'App'
import { getAppData } from 'test/appDataMocks'
import { instance } from 'api/instance'
import { wcAjax } from 'api/endpoints'
import { renderWithStore, tick } from 'test/testHelpers'
import store from 'redux/store'
import { appApi } from 'api'

jest.mock('pages/Home/Home', () => {
  return function MockName() {
    return <div>Fake component</div>
  }
})

describe('SignIn page test', () => {
  it('should correctly send data and display error', async () => {
    const post = jest.spyOn(instance, 'post')
    const fetchGeneralData = jest.spyOn(appApi, 'fetchGeneralData')
    fetchGeneralData.mockResolvedValue(getAppData())

    const component = renderWithStore(<App />, { store: store })

    //Initially Loader & Go to "Sign in" page
    const loader = component.getByRole('progressbar', { name: 'Page loader' })
    expect(loader).toBeInTheDocument()
    const signInLink = await component.findByRole('link', { name: 'Sign in' })
    fireEvent.click(signInLink)

    //Submit with correct data
    post.mockResolvedValueOnce({ data: { success: true, data: 'token' } })
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Username or email' }),
      { target: { value: 'admin' } }
    )
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(post).toHaveBeenCalledWith(
      wcAjax('rewooc_get_current_user'),
      new URLSearchParams({ username: 'admin', password: 'pass' })
    )

    //Show Error message if response success false
    post.mockResolvedValueOnce({ data: { success: false, data: 'token' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(await component.findByLabelText('Error')).toBeInTheDocument()

    //Hide Error message if response success true
    post.mockResolvedValueOnce({ data: { success: true, data: 'token' } })
    expect(component.queryByLabelText('Error')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    await tick()
    expect(component.queryByLabelText('Error')).not.toBeInTheDocument()
  })
})
