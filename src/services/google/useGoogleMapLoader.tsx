import { Loader } from '@googlemaps/js-api-loader'
import { Config } from '../../config'
import { useEffect, useState } from 'react'

const loader = new Loader({
  apiKey: Config.googleMapApi,
  libraries: ['places'],
  language: 'en',
})

export function useGoogleMapLoader(): any {
  const [google, setGoogle] = useState<any>(null)

  useEffect(() => {
    loader.load().then(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      setGoogle(window.google)
    })
  }, [])

  return google
}
