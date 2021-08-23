import './GoogleMap.scss'
import React, { FC, useEffect } from 'react'
import { ILocation, IViewport } from 'app-types'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const google = window.google

interface IProps {
  id: string
  viewport?: IViewport
  markerLocation?: ILocation
}

const GoogleMap: FC<IProps> = (props) => {
  const { viewport, id, markerLocation } = props
  useEffect(() => {
    const map = new google.maps.Map(document.getElementById(id))
    if (viewport) {
      map.fitBounds(viewport)
    }
    if(markerLocation) {
      new google.maps.Marker({
        position: markerLocation,
        map,
        title: "Your current location",
      });
    }
  }, [viewport])
  return <div className="rw-google-map" id={id} />
}

export default GoogleMap
