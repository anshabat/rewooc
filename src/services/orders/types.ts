export interface FilterChoiceValue {
  label: string
  value: string
  count?: number
}

export interface FilterAttributeValue {
  label: string
  type: 'multichoice' | 'range'
  values: FilterChoiceValue[]
}

export interface IFilterAttributes {
  // TODO make with generic
  [key: string]: FilterAttributeValue
}

/*
export interface FilterAttribute {
  [key: string]: FilterChoiceValue[]
}*/
