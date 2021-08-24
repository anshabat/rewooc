import React, { FC, useEffect, useRef } from 'react'
import { IPlace } from 'app-types'
import FormField from '../Form/FormField/FormField'
import { CheckoutFormType } from '../../../hooks/useCheckoutReducer'
import { useGoogleMapLoader } from 'app-services/google/useGoogleMapLoader'

interface IProps {
  formData: CheckoutFormType
  error: string
  onChangeAddress: (value: string) => void
  onSelect: (place: IPlace | null) => void
}

const AddressAutocomplete: FC<IProps> = (props) => {
  const { onSelect, formData, error, onChangeAddress } = props
  const value = formData.billing_address.value
  const inputRef = useRef<HTMLInputElement>(null)
  const google = useGoogleMapLoader()

  useEffect(() => {
    const input = document.getElementById('billing_address') as HTMLInputElement
    if (!google || !input) {
      return
    }
    const options: google.maps.places.AutocompleteOptions = {
      componentRestrictions: { country: 'ua' },
      fields: ['geometry', 'icon', 'name'],
      strictBounds: false,
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', () => {
      const { geometry } = autocomplete.getPlace()
      onChangeAddress(inputRef.current?.value ?? value)
      if (!geometry?.location) {
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
  }, [google])

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
