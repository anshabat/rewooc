import React, { FC, useEffect, useState } from 'react'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const google = window.google

interface ILocation {
  lat: number
  lng: number
}

interface IProps {
  onSelect: (location: ILocation | null) => void
}

const AddressAutocomplete: FC<IProps> = (props) => {
  const { onSelect } = props
  const [value, setValue] = useState('')
  useEffect(() => {
    const input = document.getElementById('pac-input')
    const options = {
      componentRestrictions: { country: 'ua' },
      fields: ['geometry', 'icon', 'name'],
      strictBounds: false,
    }
    const autocomplete = new google.maps.places.Autocomplete(input, options)
    autocomplete.addListener('place_changed', () => {
      const { geometry } = autocomplete.getPlace()
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
      <input
        type="text"
        id="pac-input"
        style={{ width: '100%', padding: '5px 10px' }}
        value={value}
        onChange={(e) => {
          setValue(e.target.value)
        }}
      />
    </div>
  )
}

export default AddressAutocomplete
