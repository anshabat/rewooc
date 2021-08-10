import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import ChoiceGroup from '../../../UI/Form/ChoiceGroup/ChoiceGroup'
import { checkoutApi, IDeliveryMethod } from 'app-api'
import { FormType } from 'app-services/form'

interface IProps {
  formData: FormType
  onChange: (method: IDeliveryMethod, e: ChangeEvent<HTMLInputElement>) => void
  error: string
  setField: any
}

const DeliveryMethods: FC<IProps> = (props) => {
  const { formData, error, onChange, setField } = props
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])

  useEffect(() => {
    checkoutApi
      .fetchDeliveryMethods(formData.billing_country.value)
      .then((delivery) => {
        setDeliveryMethods(delivery)
        setField('deliveryMethodId', '')
      })
  }, [formData.billing_country])

  return (
    <ChoiceGroup items={deliveryMethods} error={error}>
      {(method) => {
        return (
          <ChoiceField
            key={method.id}
            label={`${method.title} ${method.cost}`}
            name="deliveryMethodId"
            type="radio"
            value={method.id}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              onChange(method, e)
            }}
            required={formData.deliveryMethodId.validation.required}
            checked={Number(formData.deliveryMethodId.value) === method.id}
          />
        )
      }}
    </ChoiceGroup>
  )
}

export default DeliveryMethods
