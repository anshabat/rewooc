import React from 'react'
import { act, fireEvent, render, within } from '@testing-library/react'
import CheckoutForm from 'components/shop/checkout/CheckoutForm/CheckoutForm'
import { rootReducer } from 'redux/store'
import { Provider } from 'react-redux'
import { authApi, checkoutApi, IPaymentMethod, IRegion } from 'api'
import { getAppData } from 'test/appDataMocks'
import { initAppSuccess } from 'redux/app/appActions'
import { createStore } from 'redux'
import { getDeliveryMethodMock } from 'test/deliveryMethodMocks'

const paymentMethodsMock: IPaymentMethod[] = [
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
]

const regionsMock: IRegion[] = [
  ['Belarus', 'BY'],
  ['Ukraine', 'UA'],
]

describe('Checkout form', () => {
  const fetchCountries = jest.spyOn(checkoutApi, 'fetchCountries')
  fetchCountries.mockResolvedValue(regionsMock)

  const fetchPaymentMethods = jest.spyOn(checkoutApi, 'fetchPaymentMethods')
  fetchPaymentMethods.mockResolvedValue(paymentMethodsMock)

  const fetchDeliveryMethods = jest.spyOn(checkoutApi, 'fetchDeliveryMethods')
  fetchDeliveryMethods.mockResolvedValue(
    getDeliveryMethodMock([{ id: '15', title: 'Method', cost: 20 }])
  )

  const checkEmail = jest.spyOn(authApi, 'checkEmail')
  checkEmail.mockResolvedValue(true)

  it('should render form fields for guests', async () => {
    const store = createStore(rootReducer)
    const { findByRole, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn()} />
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
        <CheckoutForm onUpdateDelivery={jest.fn()} />
      </Provider>
    )
    await act(() => Promise.resolve())

    expect(queryByLabelText(/sign up user/i)).not.toBeInTheDocument()
  })

  it('should activate shipping to another person mode', async () => {
    const store = createStore(rootReducer)
    const { getAllByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn()} />
      </Provider>
    )
    await act(() => Promise.resolve())

    fireEvent.click(getByLabelText(/ship to another person/i))
    expect(getAllByLabelText(/first name/i)).toHaveLength(2)
    expect(getAllByLabelText(/last name/i)).toHaveLength(2)
  })

  it('should activate sign up user mode', async () => {
    const store = createStore(rootReducer)
    const { queryByLabelText, getByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn()} />
      </Provider>
    )
    await act(() => Promise.resolve())

    expect(queryByLabelText(/password name/i)).not.toBeInTheDocument()
    expect(queryByLabelText(/repeat password/i)).not.toBeInTheDocument()

    fireEvent.click(getByLabelText(/sign up user/i))
    await act(() => Promise.resolve())

    expect(getByLabelText(/password name/i)).toBeRequired()
    expect(getByLabelText(/repeat password/i)).toBeRequired()
    expect(getByLabelText(/email/i)).toBeRequired()
    expect(checkEmail).toBeCalled()

    fireEvent.blur(getByLabelText(/email/i))
    await act(() => Promise.resolve())

    expect(checkEmail).toBeCalled()
  })

  it('should show delivery methods', async () => {
    const store = createStore(rootReducer)
    const { findByText, findByRole } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn()} />
      </Provider>
    )

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    await act(() => Promise.resolve())

    expect(fetchDeliveryMethods).toHaveBeenCalledTimes(1)
    expect(fetchDeliveryMethods).toHaveBeenCalledWith('UA')
    expect(await findByText('Delivery_1 0'))
  })

  it('should show address filed', async () => {
    const store = createStore(rootReducer)
    const { getByLabelText, findByText, findByRole, queryByLabelText } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={jest.fn()} />
      </Provider>
    )

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    expect(queryByLabelText(/address/i)).not.toBeInTheDocument()

    fireEvent.click(await findByText('Method 20'))
    expect(getByLabelText(/address/i)).toBeInTheDocument()
  })

  it('should call onUpdateDelivery', async () => {
    const store = createStore(rootReducer)
    const onUpdateDelivery = jest.fn()
    const { findByText, findByRole } = render(
      <Provider store={store}>
        <CheckoutForm onUpdateDelivery={onUpdateDelivery} />
      </Provider>
    )

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    fireEvent.click(await findByText('Delivery_1 0'))

    expect(onUpdateDelivery).toBeCalledTimes(1)
  })

  // it('should submit form', () => {})
})

// expect(
//   await findByRole('option', { name: 'Chose your country' })
// ).toHaveValue('')
// expect(await findByRole('option', { name: 'Belarus' })).toHaveValue('BY')
// expect(await findByRole('option', { name: 'Ukraine' })).toHaveValue('UA')
