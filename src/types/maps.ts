export interface ILocation {
  lat: number
  lng: number
}

export type IViewport = any

export interface IPlace {
  location: ILocation
  viewport: IViewport
}
