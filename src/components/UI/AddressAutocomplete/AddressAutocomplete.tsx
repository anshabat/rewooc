import React, { FC, useEffect, useRef } from 'react'
import { ILocation } from 'app-types'
import FormField from '../Form/FormField/FormField'
import { CheckoutFormType } from '../../../hooks/useCheckoutReducer'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const google = window.google

interface IProps {
  formData: CheckoutFormType
  error: string
  onChangeAddress: (value: string) => void
  onSelect: (location: ILocation | null) => void
}

const AddressAutocomplete: FC<IProps> = (props) => {
  const { onSelect, formData, error, onChangeAddress } = props
  const value = formData.billing_address.value
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const input = document.getElementById('billing_address')
    const options = {
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
        lat: geometry.location.lat(),
        lng: geometry.location.lng(),
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
