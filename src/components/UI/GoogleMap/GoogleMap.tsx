import './GoogleMap.scss'
import React, { FC, useEffect, useState } from 'react'
import { ILocation, IViewport } from 'app-types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const google = window.google

interface IProps {
  id: string
  viewport?: IViewport
  markerLocation?: ILocation
  currentLocation?: ILocation | null
}

const GoogleMap: FC<IProps> = (props) => {
  const { viewport, id, markerLocation, currentLocation } = props
  const [map, setMap] = useState<any>(null)

  useEffect(() => {
    const googleMap = new google.maps.Map(document.getElementById(id))
    if (viewport) {
      googleMap.fitBounds(viewport)
    }
    if (markerLocation) {
      new google.maps.Marker({
        position: markerLocation,
        map: googleMap,
        title: 'Address location',
      })
    }
    setMap(googleMap)
  }, [viewport, markerLocation])

  useEffect(() => {
    if (map && currentLocation) {
      new google.maps.Marker({
        position: currentLocation,
        map,
        title: 'Current location',
      })
    }
  }, [map, currentLocation])

  return <div className="rw-google-map" id={id} />
}

export default GoogleMap
