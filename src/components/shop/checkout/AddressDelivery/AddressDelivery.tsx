import './AddressDelivery.scss'
import React, { FC, useState } from 'react'
import AddressAutocomplete from '../../../UI/AddressAutocomplete/AddressAutocomplete'
import { ILocation, IPlace } from 'app-types'
import GoogleMap from '../../../UI/GoogleMap/GoogleMap'
import { CheckoutFormType } from '../../../../hooks/useCheckoutReducer'
import Button from '../../../UI/Button/Button'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const geolocation = window.navigator.geolocation

interface IProps {
  formData: CheckoutFormType
  error: string
  onAddressInput: (value: string) => void
}

const AddressDelivery: FC<IProps> = (props) => {
  const { formData, error, onAddressInput } = props
  const [place, setPlace] = useState<IPlace | null>(null)
  const [currentLocation, setCurrentLocation] = useState<ILocation | null>()

  const getCurrentLocation = () => {
    geolocation.getCurrentPosition(
      (position: any) => {
        const { latitude, longitude } = position.coords
        console.log(position)
        setCurrentLocation({ lng: latitude, lat: longitude })
      },
      () => {
        console.error('no current location allowed')
      }
    )
  }

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
        <>
          <div className="rw-address-delivery__map">
            <GoogleMap
              id="delivery-address-map"
              viewport={place.viewport}
              markerLocation={place.location}
              currentLocation={currentLocation}
            />
          </div>
          <div className="rw-address-delivery__actions">
            <Button
              size="md"
              color="secondary"
              type="button"
              onClick={getCurrentLocation}
            >
              Calculate
            </Button>
          </div>
        </>
      ) : null}
    </div>
  )
}

export default AddressDelivery
