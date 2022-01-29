export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

interface TFilterAttribute<T> {
  label: string
  key: T
  type: string
  isApplied: boolean
}

export interface TFilterChoiseAttribute<T> extends TFilterAttribute<T> {
  options: FilterChoiceValue[]
}

export type TFilterValues<T extends string> = Record<T, string[]>
