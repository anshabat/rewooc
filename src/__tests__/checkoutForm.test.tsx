import React from 'react'
import { fireEvent, within } from '@testing-library/react'
import CheckoutForm from 'components/shop/checkout/CheckoutForm/CheckoutForm'
import { rootReducer } from 'redux/store'
import { authApi, checkoutApi, IPaymentMethod, IRegion, orderApi } from 'api'
import { getAppData } from 'test/appDataMocks'
import { initAppSuccess } from 'redux/app/appActions'
import { createStore } from 'redux'
import { getDeliveryMethodMock } from 'test/deliveryMethodMocks'
import { addToCartSuccess } from 'redux/cart/cartActions'
import { getCartItemsMocks } from 'test/cartMocks'
import { getCheckoutFormDataMock } from 'test/checkoutFormMock'
import { renderWithStore, tick } from 'test/testHelpers'

const mockHistoryPush = jest.fn()
jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}))

const paymentMethodsMock: IPaymentMethod[] = [
  {
    description: 'Desc_1',
    enabled: true,
    id: 'id_1',
    order: 0,
    title: 'Payment_1',
  },
  {
    description: 'Desc2',
    enabled: true,
    id: 'id_2',
    order: 1,
    title: 'Payment_2',
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

  const fakeOrder = {
    order: 1,
    user: 0,
  }
  const createOrder = jest.spyOn(orderApi, 'createOrder')
  createOrder.mockResolvedValue(fakeOrder)

  it('should render form fields for guests', async () => {
    const { findByRole, getByLabelText } = renderWithStore(
      <CheckoutForm onUpdateDelivery={jest.fn()} />
    )

    //avoid error with getBy... selectors when state updates in useEffect
    await tick()

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

    expect(fetchCountries).toHaveBeenCalledTimes(1)
    expect(fetchPaymentMethods).toHaveBeenCalledTimes(1)
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
    const { queryByLabelText } = renderWithStore(
      <CheckoutForm onUpdateDelivery={jest.fn()} />,
      { store }
    )
    await tick()

    expect(queryByLabelText(/sign up user/i)).not.toBeInTheDocument()
  })

  it('should activate shipping to another person mode', async () => {
    const { getAllByLabelText, getByLabelText } = renderWithStore(
      <CheckoutForm onUpdateDelivery={jest.fn()} />
    )
    await tick()

    fireEvent.click(getByLabelText(/ship to another person/i))
    expect(getAllByLabelText(/first name/i)).toHaveLength(2)
    expect(getAllByLabelText(/last name/i)).toHaveLength(2)
  })

  it('should activate sign up user mode', async () => {
    const { queryByLabelText, getByLabelText } = renderWithStore(
      <CheckoutForm onUpdateDelivery={jest.fn()} />
    )
    await tick()

    expect(queryByLabelText(/password name/i)).not.toBeInTheDocument()
    expect(queryByLabelText(/repeat password/i)).not.toBeInTheDocument()

    fireEvent.click(getByLabelText(/sign up user/i))
    await tick()

    expect(getByLabelText(/password name/i)).toBeRequired()
    expect(getByLabelText(/repeat password/i)).toBeRequired()
    expect(getByLabelText(/email/i)).toBeRequired()
    expect(checkEmail).toBeCalled()

    fireEvent.blur(getByLabelText(/email/i))
    await tick()

    expect(checkEmail).toBeCalled()
  })

  it('should show delivery methods', async () => {
    const { findByText, findByRole } = renderWithStore(
      <CheckoutForm onUpdateDelivery={jest.fn()} />
    )

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    await tick()

    expect(fetchDeliveryMethods).toHaveBeenCalledTimes(1)
    expect(fetchDeliveryMethods).toHaveBeenCalledWith('UA')
    expect(await findByText('Delivery_1 0'))
  })

  it('should show address filed', async () => {
    const {
      getByLabelText,
      findByText,
      findByRole,
      queryByLabelText,
    } = renderWithStore(<CheckoutForm onUpdateDelivery={jest.fn()} />)

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    expect(queryByLabelText(/address/i)).not.toBeInTheDocument()

    fireEvent.click(await findByText('Method 20'))
    expect(getByLabelText(/address/i)).toBeInTheDocument()
  })

  it('should call onUpdateDelivery', async () => {
    const onUpdateDelivery = jest.fn()
    const { findByText, findByRole } = renderWithStore(
      <CheckoutForm onUpdateDelivery={onUpdateDelivery} />
    )

    const countryField = await findByRole('combobox', { name: 'Country' })
    fireEvent.change(countryField, { target: { value: 'UA' } })

    fireEvent.click(await findByText('Delivery_1 0'))

    expect(onUpdateDelivery).toBeCalledTimes(1)
  })

  it('should submit form', async () => {
    const {
      getByLabelText,
      queryAllByText,
      getByRole,
      findByRole,
      findByText,
      queryByText,
      getAllByText,
      getByText,
      getByTestId,
      store,
    } = renderWithStore(<CheckoutForm onUpdateDelivery={jest.fn()} />)

    await tick()

    const submitButton = getByRole('button', { name: 'Submit' })

    // Submit with empty form
    fireEvent.click(submitButton)
    expect(queryByText(/Cart Is Empty/i)).not.toBeInTheDocument()
    expect(getAllByText('Field is required').length).toBeGreaterThan(1)

    //Fill form
    const formData = getCheckoutFormDataMock()
    fireEvent.change(getByLabelText(/first name/i), {
      target: { value: formData.billing_first_name.value },
    })
    fireEvent.change(getByLabelText(/last name/i), {
      target: { value: formData.billing_last_name.value },
    })
    fireEvent.change(getByLabelText(/phone/i), {
      target: { value: formData.billing_phone.value },
    })
    fireEvent.change(getByLabelText(/email/i), {
      target: { value: formData.billing_email.value },
    })
    fireEvent.change(await findByRole('combobox', { name: 'Country' }), {
      target: { value: formData.billing_country.value },
    })
    fireEvent.click(await findByText('Delivery_1 0'))
    fireEvent.click(getByText('Payment_1'))
    fireEvent.change(getByLabelText(/order notes/i), {
      target: { value: formData.order_note.value },
    })

    // Submit filled form with Empty cart
    fireEvent.click(submitButton)
    expect(getByText(/Cart Is Empty/i)).toBeInTheDocument()
    expect(queryAllByText('Field is required')).toHaveLength(0)

    // Close empty cart error message
    fireEvent.click(getByTestId('backdrop'))
    expect(queryByText(/Cart Is Empty/i)).not.toBeInTheDocument()

    // Add item to cart
    store.dispatch(addToCartSuccess(getCartItemsMocks()[0]))
    fireEvent.click(submitButton)
    expect(queryByText(/Cart Is Empty/i)).not.toBeInTheDocument()
    expect(submitButton).toBeDisabled()

    await tick()

    expect(mockHistoryPush).toHaveBeenCalledWith(
      `/my-account/view-order/${fakeOrder.order}`
    )

    expect(mockHistoryPush).toHaveBeenCalledTimes(1)
    expect(createOrder).toHaveBeenCalledWith(
      formData,
      [getCartItemsMocks()[0]],
      fakeOrder.user
    )
    expect(createOrder).toHaveBeenCalledTimes(1)
    expect(getByLabelText(/first name/i)).toHaveValue('')
    expect(submitButton).not.toBeDisabled()
  })
})
