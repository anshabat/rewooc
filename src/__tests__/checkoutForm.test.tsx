import React from 'react'
import { act, render, within } from '@testing-library/react'
import CheckoutForm from 'components/shop/checkout/CheckoutForm/CheckoutForm'
import store from 'redux/store'
import { Provider } from 'react-redux'
import { checkoutApi } from 'api'
import { getAppData } from 'test/appDataMocks'
import { initAppSuccess } from 'redux/app/appActions'

fdescribe('Checkout form', () => {
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
})
