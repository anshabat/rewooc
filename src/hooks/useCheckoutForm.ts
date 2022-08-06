import { FormEvent, useState } from 'react'
import { validate, ValidationErrorType } from 'services/form'
import { authApi, orderApi } from 'api'
import { ErrorMessage } from '../shared/errorMessages'
import { signIn } from '../redux/auth/authActions'
import { clearCart } from '../redux/cart/cartActions'
import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../redux/cart/cartSelectors'
import { useHistory } from 'react-router-dom'
import { selectAccountUserId } from '../redux/account/accountSelector'
import { CheckoutFormType } from './useCheckoutReducer'

export const useCheckoutForm = (
  formData: CheckoutFormType,
  onClear: () => void
) => {
  const [isOrderLoading, setOrderLoading] = useState(false)
  const [errors, setErrors] = useState<ValidationErrorType>({})
  const [cartEmptyError, setCartEmptyError] = useState(false)
  const cartItems = useSelector(selectCartItems)
  const userId = useSelector(selectAccountUserId)
  const dispatch = useDispatch()
  const history = useHistory()

  const hideEmptyCartError = () => {
    setCartEmptyError(false)
  }

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [hasErrors, formErrors] = validate(formData)
    setErrors(formErrors)
    if (hasErrors) {
      return
    }

    if (cartItems.length === 0) {
      setCartEmptyError(true)
      return
    }

    setOrderLoading(true)

    try {
      let emailExists = false
      if (formData.sign_up.value) {
        emailExists = await authApi.checkEmail(formData.billing_email.value)
      }

      if (emailExists) {
        setErrors({ billing_email: ErrorMessage.EMAIL_ALREADY_EXISTS })
      } else {
        const orderData = await orderApi.createOrder(
          formData,
          cartItems,
          userId
        )

        dispatch(clearCart())
        onClear()

        if (orderData.user && !userId) {
          dispatch(
            signIn(
              formData.billing_email.value,
              formData.account_password.value
            )
          )
        }

        return history.push(`/my-account/view-order/${orderData.order}`)
      }
    } catch (error: any) {
      alert(error.message)
    }

    setOrderLoading(false)
  }

  const validateEmail = async (email: string, shouldCheck: boolean) => {
    let emailExists = false
    if (shouldCheck) {
      emailExists = await authApi.checkEmail(email)
    }
    if (emailExists) {
      setErrors({ billing_email: ErrorMessage.EMAIL_ALREADY_EXISTS })
    } else {
      setErrors({})
    }
  }

  return {
    isOrderLoading,
    errors,
    submitForm,
    validateEmail,
    cartEmptyError,
    hideEmptyCartError,
  }
}
