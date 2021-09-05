import { Loader } from '@googlemaps/js-api-loader'
import { Config } from '../../config'
import { useEffect, useState } from 'react'

type GoogleType = typeof globalThis.google

export function useGoogleMapLoader(): GoogleType | null {
  const [google, setGoogle] = useState<GoogleType | null>(null)

  const loader = new Loader({
    apiKey: Config.googleMapApi,
    libraries: ['places'],
    language: 'en',
  })

  useEffect(() => {
    loader.load().then((google) => {
      setGoogle(google)
    })
  }, [])

  return google
}
