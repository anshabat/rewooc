import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import App from 'App'
import { getAppData } from 'test/appDataMocks'
import { Provider } from 'react-redux'
import store from 'redux/store'
import { instance } from 'api/instance'
import { wcAjax } from 'api/endpoints'

// jest.mock('axios', () => {
//   return {
//     create: jest.fn(() => jest.genMockFromModule('axios')),
//     get: jest.fn(() => Promise.resolve({data: getAppData()})),
//   }
// })

//jest.mock('axios')

// jest.mock('axios', () => {
//   return {
//     create: () => {
//       return {
//         interceptors: {
//           request: {eject: jest.fn(), use: jest.fn()},
//           response: {eject: jest.fn(), use: jest.fn()},
//         },
//       };
//     },
//   };
// });

//jest.mock('axios')
// axios.create.mockReturnThis();
// //@ts-ignore
// axios.create = () => {
//   return {
//     interceptors: {
//       request: { eject: jest.fn(), use: jest.fn() },
//       response: { eject: jest.fn(), use: jest.fn() },
//     },
//   }
// }

/**
 * 
const mockAxios = jest.genMockFromModule('axios')

// this is the key to fix the axios.create() undefined error!
mockAxios.create = jest.fn(() => mockAxios)
 */

/*
1 - мок запиту на головну сторінку
2 - мок запиту на 
*/

// jest.mock('redux/auth/authActions', () => {
//   const originalModule = jest.requireActual('redux/auth/authActions')
//   return {
//     ...originalModule,
//     checkAuth: jest.fn(() => {
//       return {
//         type: INIT_APP_SUCCESS,
//         payload: appData,
//       }
//     }),
//   }
// })

// const appData = getAppData()

/*
get.mockImplementation((url) => {
      switch (url) {
        case wcAjax('rewooc_get_common_data'):
          return Promise.resolve({ data: getAppData() })
        default:
          return Promise.resolve({ data: null })
      }
    })
    */

fdescribe('sign pagee', () => {
  it('should correctly send data and display error', async () => {
    const get = jest.spyOn(instance, 'get')
    const post = jest.spyOn(instance, 'post')
    get.mockResolvedValueOnce({ data: getAppData() })

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

    //Set form error data
    post.mockResolvedValueOnce({ data: { success: false, data: 'token' } })
    fireEvent.change(
      screen.getByRole('textbox', { name: 'Username or email' }),
      { target: { value: 'admin' } }
    )
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    await component.findByLabelText('Error')
    expect(post).toHaveBeenCalledWith(
      wcAjax('rewooc_get_current_user'),
      new URLSearchParams({ username: 'admin', password: '' })
    )

    //Set form correct data
    post.mockResolvedValueOnce({ data: { success: false, data: 'token' } })
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'pass' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    expect(post).toHaveBeenCalledWith(
      wcAjax('rewooc_get_current_user'),
      new URLSearchParams({ username: 'admin', password: 'pass' })
    )
    expect(await component.findByLabelText('Error')).toBeInTheDocument()

    //Error message is removed
    post.mockResolvedValueOnce({ data: { success: false, data: 'token' } })
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))
    await act(() => Promise.resolve())
    expect(component.queryByLabelText('Error')).toBeInTheDocument()
    expect(get).toHaveBeenCalledTimes(1)

    //Success
    post.mockResolvedValueOnce({ data: { success: true, data: 'token' } })

    expect(get).toHaveBeenCalledTimes(1)
    expect(get).toHaveBeenCalledWith(wcAjax('rewooc_get_common_data'))

    expect(component.queryByLabelText('Error')).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Sign in' }))

    await act(() => Promise.resolve())
    expect(component.queryByLabelText('Error')).not.toBeInTheDocument()
  })
})
