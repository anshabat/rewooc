import './AddressDelivery.scss'
import React, { FC, useState } from 'react'
import AddressAutocomplete from '../../../UI/AddressAutocomplete/AddressAutocomplete'
import { IPlace } from 'app-types'
import GoogleMap from '../../../UI/GoogleMap/GoogleMap'
import { CheckoutFormType } from '../../../../hooks/useCheckoutReducer'

interface IProps {
  formData: CheckoutFormType
  error: string
  onAddressInput: (value: string) => void
}

const AddressDelivery: FC<IProps> = (props) => {
  const { formData, error, onAddressInput } = props
  const [place, setPlace] = useState<IPlace | null>(null)
  return (
    <div className="rw-address-delivery">
      <div className="rw-address-delivery__field">
        <AddressAutocomplete
          formData={formData}
          error={error}
          onChangeAddress={onAddressInput}
          onSelect={(place) => {
            setPlace(place)
          }}
        />
      </div>
      {place ? (
        <div className="rw-address-delivery__map">
          <GoogleMap
            id="delivery-address-map"
            viewport={place.viewport}
            markerLocation={place.location}
          />
        </div>
      ) : null}
    </div>
  )
}

export default AddressDelivery
