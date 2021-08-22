import React, { FC, useState } from 'react'
import AddressAutocomplete from '../../../UI/AddressAutocomplete/AddressAutocomplete'
import { ILocation } from 'app-types'
import GoogleMap from '../../../UI/GoogleMap/GoogleMap'

const AddressDelivery: FC = () => {
  const [location, setLocation] = useState<ILocation | null>(null)
  return (
    <div>
      <AddressAutocomplete
        onSelect={(location) => {
          setLocation(location)
        }}
      />
      {location ? <GoogleMap location={location} /> : null}
    </div>
  )
}

export default AddressDelivery
