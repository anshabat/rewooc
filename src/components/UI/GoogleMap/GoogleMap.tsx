import './GoogleMap.scss'
import React, { FC, useEffect, useState } from 'react'
import { ILocation, IViewport } from 'app-types'
import Button from '../Button/Button'
import { Loader } from '@googlemaps/js-api-loader'
import { Config } from '../../../config'

const loader = new Loader({
  apiKey: Config.googleMapApi,
  libraries: ['places'],
  language: 'en',
})

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
  const [google, setGoogle] = useState<any>(null)

  useEffect(() => {
    loader.load().then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setGoogle(window.google)
    })
  }, [])

  useEffect(() => {
    if (!google) {
      return
    }
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
