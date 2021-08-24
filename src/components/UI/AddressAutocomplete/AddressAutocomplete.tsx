import React, { FC, useEffect, useRef } from 'react'
import { IPlace } from 'app-types'
import FormField from '../Form/FormField/FormField'
import { CheckoutFormType } from '../../../hooks/useCheckoutReducer'
import { Loader } from '@googlemaps/js-api-loader'
import { Config } from '../../../config'

interface IProps {
  formData: CheckoutFormType
  error: string
  onChangeAddress: (value: string) => void
  onSelect: (place: IPlace | null) => void
}

const loader = new Loader({
  apiKey: Config.googleMapApi,
  libraries: ['places'],
  language: 'en',
})

const AddressAutocomplete: FC<IProps> = (props) => {
  const { onSelect, formData, error, onChangeAddress } = props
  const value = formData.billing_address.value
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    loader.load().then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const google = window.google
      const input = document.getElementById('billing_address')
      const options = {
        componentRestrictions: { country: 'ua' },
        fields: ['geometry', 'icon', 'name'],
        strictBounds: false,
      }
      if (!google) {
        return
      }
      const autocomplete = new google.maps.places.Autocomplete(input, options)
      autocomplete.addListener('place_changed', () => {
        const { geometry } = autocomplete.getPlace()
        onChangeAddress(inputRef.current?.value ?? value)
        if (!geometry) {
          return onSelect(null)
        }
        onSelect({
          location: {
            lat: geometry.location.lat(),
            lng: geometry.location.lng(),
          },
          viewport: geometry.viewport,
        })
      })
    })
  }, [])

  return (
    <div>
      <FormField
        label="Address"
        name="billing_address"
        id="billing_address"
        type="text"
        value={value}
        required={formData.billing_address.validation.required}
        error={error}
        onChange={(e) => {
          onChangeAddress(e.target?.value ?? '')
        }}
        elementRef={inputRef}
      />
    </div>
  )
}

export default AddressAutocomplete