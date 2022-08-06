import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import App from 'App'
import { getAppData } from 'test/appDataMocks'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { instance } from 'api/instance'
import { wcAjax } from 'api/endpoints'

describe('SignIn page test', () => {
  it('should correctly send data and display error', async () => {
    const get = jest.spyOn(instance, 'get')
    const post = jest.spyOn(instance, 'post')
    get.mockImplementation((url) => {
      if (url === wcAjax('rewooc_get_common_data')) {
        return Promise.resolve({ data: getAppData() })
      }
      return Promise.resolve({ data: null })
    })

    const component = render(
      <Provider store={store}>
        <App />
      </Provider>
    )

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
    await act(() => Promise.resolve())
    expect(component.queryByLabelText('Error')).not.toBeInTheDocument()
  })
})
