import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import ChoiceField from '../../../UI/Form/ChoiceField/ChoiceField'
import ChoiceGroup from '../../../UI/Form/ChoiceGroup/ChoiceGroup'
import { checkoutApi, IDeliveryMethod } from 'app-api'
import { FormType } from 'app-services/form'

interface IProps {
  formData: FormType
  onChange: (method: IDeliveryMethod, e: ChangeEvent<HTMLInputElement>) => void
  error: string
  onLoad: (methods: IDeliveryMethod[]) => void
}

const DeliveryMethods: FC<IProps> = (props) => {
  const { formData, error, onChange, onLoad } = props
  const [deliveryMethods, setDeliveryMethods] = useState<IDeliveryMethod[]>([])

  useEffect(() => {
    checkoutApi
      .fetchDeliveryMethods(formData.billing_country.value)
      .then((methods) => {
        setDeliveryMethods(methods)
        onLoad(methods)
      })
  }, [formData.billing_country])

  if (!deliveryMethods.length) {
    return <p>There are no available delivery methods</p>
  }

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
