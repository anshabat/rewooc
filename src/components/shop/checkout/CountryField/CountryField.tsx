import React, { ChangeEvent, FC, useEffect, useState } from 'react'
import SelectField from '../../../UI/Form/SelectField/SelectField'
import { checkoutApi, IRegion } from 'app-api'
import { CheckoutFormType } from '../../../../hooks/useCheckoutReducer'

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

  return (
    <SelectField
      label="Country"
      name="billing_country"
      id="billing_country"
      value={formData.billing_country.value}
      required={formData.billing_country.validation.required}
      error={error}
      onChange={onChange}
      options={countries}
    />
  )
}

export default CountryField
