import React, { FC, useEffect } from 'react'
import { IPlace } from 'types'
import { CheckoutFormType } from '../../../hooks/useCheckoutReducer'
import { useGoogleMapLoader } from 'services/google/useGoogleMapLoader'
import Input from '../Form/Input/Input'

interface IProps {
  formData: CheckoutFormType
  error: string
  onChangeAddress: (value: string) => void
  onSelect: (place: IPlace | null) => void
}

const AddressAutocomplete: FC<IProps> = (props) => {
  const { onSelect, formData, error, onChangeAddress } = props
  const value = formData.billing_address.value
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
      onChangeAddress(input.value ?? value)
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
      <Input
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
      />
    </div>
  )
}

export default AddressAutocomplete
