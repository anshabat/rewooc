import React from 'react'
import { act, fireEvent, render, within } from '@testing-library/react'
import CheckoutForm from 'components/shop/checkout/CheckoutForm/CheckoutForm'
import { rootReducer } from 'redux/store'
import { Provider } from 'react-redux'
import { checkoutApi } from 'api'
import { getAppData } from 'test/appDataMocks'
import { initAppSuccess } from 'redux/app/appActions'
import { createStore } from 'redux'

describe.only('Checkout form', () => {
  const fetchCountries = jest.spyOn(checkoutApi, 'fetchCountries')
  const fetchPaymentMethods = jest.spyOn(checkoutApi, 'fetchPaymentMethods')
  fetchCountries.mockResolvedValue([
    ['Belarus', 'BY'],
    ['Ukraine', 'UA'],
  ])
  fetchPaymentMethods.mockResolvedValue([
    {
      description: 'Desc',
      enabled: true,
      id: 'bacs',
      order: 0,
      title: 'Direct bank transfer',
    },
    {
      description: 'Desc2',
      enabled: true,
      id: 'cheque',
      order: 1,
      title: 'Check payments',
    },
  ])

  it('should render form fields for guests', async () => {
    const store = createStore(rootReducer)
    const { findByRole, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn} />
      </Provider>
    )

    //avoid error with getBy... selectors when state updates in useEffect
    await act(() => Promise.resolve())

    expect(fetchCountries).toHaveBeenCalledTimes(1)
    expect(fetchPaymentMethods).toHaveBeenCalledTimes(1)

    expect(getByLabelText(/first name/i)).toBeRequired()
    expect(getByLabelText(/last name/i)).toBeRequired()
    expect(getByLabelText(/phone/i)).toBeRequired()
    expect(getByLabelText(/email/i)).not.toBeRequired()
    expect(getByLabelText(/ship to another person/i)).toBeInTheDocument()
    expect(getByLabelText(/sign up user/i)).toBeInTheDocument()

    const countryField = await findByRole('combobox', { name: 'Country' })
    expect(countryField).toBeRequired()
    expect(countryField).toHaveLength(3)

    const paymentGroup = await findByRole('group', { name: 'Payment' })
    expect(within(paymentGroup).getAllByRole('radio')).toHaveLength(2)
    expect(within(paymentGroup).getAllByRole('radio')[0]).toBeRequired()

    expect(getByLabelText(/order notes/i)).toBeInTheDocument()
  })

  it('should render form fields for user', async () => {
    const store = createStore(rootReducer)
    const generalData = getAppData({
      user: {
        id: 1,
        firstName: 'Admin',
        displayName: 'admin',
        lastName: '',
        email: 'test@test.com',
      },
    })
    store.dispatch(initAppSuccess(generalData))
    const { queryByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn} />
      </Provider>
    )
    await act(() => Promise.resolve())

    expect(queryByLabelText(/sign up user/i)).not.toBeInTheDocument()
  })

  it('should show shipping first and last names', async () => {
    const store = createStore(rootReducer)
    const { getAllByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn} />
      </Provider>
    )
    await act(() => Promise.resolve())

    fireEvent.click(getByLabelText(/ship to another person/i))
    expect(getAllByLabelText(/first name/i)).toHaveLength(2)
    expect(getAllByLabelText(/last name/i)).toHaveLength(2)
  })

  it('should show password field', async () => {
    const store = createStore(rootReducer)
    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn} />
      </Provider>
    )
    await act(() => Promise.resolve())

    expect(queryByLabelText(/password name/i)).not.toBeInTheDocument()
    expect(queryByLabelText(/repeat password/i)).not.toBeInTheDocument()

    fireEvent.click(getByLabelText(/sign up user/i))
    expect(getByLabelText(/password name/i)).toBeRequired()
    expect(getByLabelText(/repeat password/i)).toBeRequired()
  })

})

