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

// TODO temp, remove after filter factory
export interface FilterAttributeValue {
  label: string
  type: 'multichoice' | 'range'
  values: FilterChoiceValue[]
}

// TODO temp, remove after filter factory
export interface IFilterAttributes<T> extends FilterAttributeValue {
  key: T
}