import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { checkoutApi, IRegion } from 'api'
import { CheckoutFormType } from '../../../../hooks/useCheckoutReducer'
import Select, { Option } from '../../../UI/Form/Select/Select'
import FormField from '../../../UI/Form/FormField/FormField'

interface IProps {
  formData: CheckoutFormType
  error: string
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

const CountryField: FC<IProps> = (props) => {
  const { formData, onChange, error } = props
  const [countries, setCountries] = useState<IRegion[]>([])
  const { required } = formData.billing_country.validation

  useEffect(() => {
    checkoutApi
      .fetchCountries()
      .then((countries) => {
        setCountries(countries)
      })
      .catch((error) => {
        console.error(error.message)
      })
  }, [])

  if (!countries.length) {
    return null
  }

  return (
    <FormField
      label="Country"
      id="billing_country"
      required={required}
      error={error}
    >
      <Select
        name="billing_country"
        id="billing_country"
        onChange={onChange}
        required={required}
      >
        <Option value="">Chose your country</Option>
        {countries.map(([label, key]) => {
          return (
            <Option key={key} value={key}>
              {label}
            </Option>
          )
        })}
      </Select>
    </FormField>
  )
}

export default CountryField
