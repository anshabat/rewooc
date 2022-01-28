export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

export interface IFilter<T = string> {
  key: T
  label: string
  type: string
  isApplied: boolean
}