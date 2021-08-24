import './GoogleMap.scss'
import React, { FC, useEffect, useState } from 'react'
import { ILocation, IViewport } from 'app-types'
import Button from '../Button/Button'
import { useGoogleMapLoader } from 'app-services/google/useGoogleMapLoader'

interface IProps {
  id: string
  viewport?: IViewport
  markerLocation?: ILocation
  currentLocation?: ILocation | null
}

const GoogleMap: FC<IProps> = (props) => {
  const { viewport, id, markerLocation, currentLocation } = props
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [marker, setMarker] = useState<google.maps.Marker | null>(null)
  const [currentMarker, setCurrentMarker] = useState<google.maps.Marker | null>(
    null
  )
  const google = useGoogleMapLoader()

  useEffect(() => {
    const element = document.getElementById(id)
    if (!google || !element) {
      return
    }
    const googleMap = new google.maps.Map(element)
    if (viewport) {
      googleMap.fitBounds(viewport)
    }
    if (markerLocation) {
      const googleMarker = new google.maps.Marker({
        position: markerLocation,
        map: googleMap,
        title: 'Address location',
      })
      setMarker(googleMarker)
    }
    setMap(googleMap)
  }, [viewport, markerLocation, google])

  useEffect(() => {
    if (!google) {
      return
    }
    if (map && currentLocation) {
      const googleMarker = new google.maps.Marker({
        position: currentLocation,
        map,
        title: 'Current location',
      })
      setCurrentMarker(googleMarker)
    }
  }, [map, currentLocation, google])

  const fitViewportToMarkers = () => {
    if (!map || !google) {
      return
    }
    const bounds = new google.maps.LatLngBounds()
    if (marker) {
      const position = marker.getPosition()
      if (position) bounds.extend(position)
    }
    if (currentMarker) {
      const position = currentMarker.getPosition()
      if (position) bounds.extend(position)
    }
    map.fitBounds(bounds)
  }

  return (
    <>
      <div className="rw-google-map" id={id} />
      <div
        style={{
          margin: '-30px 0 0 10px',
          position: 'relative',
          zIndex: 999,
        }}
      >
        <Button
          size="sm"
          color="secondary"
          type="button"
          onClick={fitViewportToMarkers}
        >
          Fit viewport to markers
        </Button>
      </div>
    </>
  )
}

export default GoogleMap
