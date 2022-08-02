import React from 'react'
import { render, within } from '@testing-library/react'
import CheckoutForm from 'components/shop/checkout/CheckoutForm/CheckoutForm'
import store from 'redux/store'
import { Provider } from 'react-redux'
import { checkoutApi } from 'api'

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

  it('should render form fields for guest user', async () => {
    const { getByLabelText, findByRole } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn} />
      </Provider>
    )

    expect(fetchCountries).toHaveBeenCalledTimes(1)
    expect(fetchPaymentMethods).toHaveBeenCalledTimes(1)

    expect(getByLabelText(/first name/i)).toBeInTheDocument()
    expect(getByLabelText(/last name/i)).toBeInTheDocument()
    expect(getByLabelText(/phone/i)).toBeInTheDocument()
    expect(getByLabelText(/email/i)).toBeInTheDocument()
    expect(getByLabelText(/ship to another person/i)).toBeInTheDocument()
    expect(getByLabelText(/sign up user/i)).toBeInTheDocument()
    expect(getByLabelText(/order notes/i)).toBeInTheDocument()

    expect(await findByRole('combobox', { name: 'Country' })).toHaveLength(3)

    const paymentGroup = await findByRole('group', { name: 'Payment' })
    expect(within(paymentGroup).getAllByRole('radio')).toHaveLength(2)
  })
})
