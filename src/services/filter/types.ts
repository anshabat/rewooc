import { ReactElement } from 'react'

export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

export interface IFilter<T = string> {
  key: T
  label: string
  valuesComponent: ReactElement
  isApplied: boolean
}