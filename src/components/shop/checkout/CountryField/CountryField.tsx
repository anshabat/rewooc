import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import { checkoutApi, IRegion } from 'app-api'
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

  console.log(countries)

  return (
    <FormField
      label="Country"
      required={formData.billing_country.validation.required}
      error={error}
    >
      <Select name="billing_country" id="billing_country" onChange={onChange}>
        <Option value="">Chose your country</Option>
        {countries.map(([label, key]) => {
          return (
            <Option key={key} value={key}>{label}</Option>
          )
        })}
      </Select>
    </FormField>
  )
}

export default CountryField
