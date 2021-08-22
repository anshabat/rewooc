import React, { FC } from 'react'
import { ILocation } from 'app-types'

interface IProps {
  location: ILocation
}

const GoogleMap: FC<IProps> = (props) => {
  const { location } = props
  console.log(location)
  return <div>this is the map</div>
}

export default GoogleMap
