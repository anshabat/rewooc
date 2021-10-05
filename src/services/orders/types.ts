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

export type IFilterAttributes<Type> = {
  // TODO make with generic
  //[key: string]: FilterAttributeValue
  [Property in keyof Type]: FilterAttributeValue
}

/*
export interface FilterAttribute {
  [key: string]: FilterChoiceValue[]
}*/
