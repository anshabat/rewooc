import { ReactElement } from 'react'

export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

export interface IFilterComponent {
  key: string
  label: string
  valuesComponent: ReactElement
  isApplied: boolean
}

export interface IOrderValues {
  status: string[]
  delivery: string[]
}