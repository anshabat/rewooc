import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import ChoiceGroup from '../../../UI/Form/ChoiceGroup/ChoiceGroup'
import { FormType } from 'app-services/form'
import { checkoutApi, IPaymentMethod } from 'app-api'

interface IProps {
  formData: FormType
  onChange: (method: IPaymentMethod, e: ChangeEvent<HTMLInputElement>) => void
  error: string
}

const PaymentMethods: FC<IProps> = (props) => {
  const { formData, onChange, error } = props
  const [paymentMethods, setPaymentMethods] = useState<IPaymentMethod[]>([])

  useEffect(() => {
    checkoutApi.fetchPaymentMethods().then((payment) => {
      setPaymentMethods(payment)
    })
  }, [])

  if (!paymentMethods.length) {
    return null
  }

  return (
    <ChoiceGroup items={paymentMethods} error={error}>
      {(method) => {
        return (
          <ChoiceField
            key={method.id}
            label={method.title}
            name="payment"
            type="radio"
            value={method.id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange(method, e)
            }}
            required={formData.payment.validation.required}
            checked={formData.payment.value === method.id}
          />
        )
      }}
    </ChoiceGroup>
  )
}

export default PaymentMethods
