import React, { ChangeEvent, FC, useState } from 'react'
import AddressAutocomplete from '../../../UI/AddressAutocomplete/AddressAutocomplete'
import { ILocation } from 'app-types'
import GoogleMap from '../../../UI/GoogleMap/GoogleMap'
import { CheckoutFormType } from '../../../../hooks/useCheckoutReducer'

interface IProps {
  formData: CheckoutFormType
  error: string
  onAddressInput: (value: string) => void
}

const AddressDelivery: FC<IProps> = (props) => {
  const { formData, error, onAddressInput } = props
  const [location, setLocation] = useState<ILocation | null>(null)
  return (
    <div>
      <AddressAutocomplete
        formData={formData}
        error={error}
        onChangeAddress={onAddressInput}
        onSelect={(location) => {
          setLocation(location)
        }}
      />
      {location ? <GoogleMap location={location} /> : null}
    </div>
  )
}

export default AddressDelivery
