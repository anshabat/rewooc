import './GoogleMap.scss'
import React, { FC, useEffect, useState } from 'react'
import { ILocation, IViewport } from 'app-types'
import Button from '../Button/Button'

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
  const [marker, setMarker] = useState<any>(null)
  const [currentMarker, setCurrentMarker] = useState<any>(null)

  useEffect(() => {
    const googleMap = new google.maps.Map(document.getElementById(id))
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
  }, [viewport, markerLocation])

  useEffect(() => {
    if (map && currentLocation) {
      const googleMarker = new google.maps.Marker({
        position: currentLocation,
        map,
        title: 'Current location',
      })
      setCurrentMarker(googleMarker)
    }
  }, [map, currentLocation])

  const fitViewportToMarkers = () => {
    const bounds = new google.maps.LatLngBounds()
    if (marker) {
      bounds.extend(marker.getPosition())
    }
    if (currentMarker) {
      bounds.extend(currentMarker.getPosition())
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
