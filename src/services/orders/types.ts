export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

interface FilterAttributeValue {
  key: string
  label: string
  type: 'multichoice' | 'range'
  values: FilterChoiceValue
}

/*
export interface FilterAttribute {
  [key: string]: FilterAttributeValue
}*/

export interface FilterAttribute {
  [key: string]: FilterChoiceValue[]
}