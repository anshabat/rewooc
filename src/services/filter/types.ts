export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

interface TFilterAttribute {
  label: string
  key: string
  type: string
  isApplied: boolean
}

export interface TFilterChoiseAttribute extends TFilterAttribute {
  options: FilterChoiceValue[]
}