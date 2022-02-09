export interface IFormField<T, P = string> {
  value: T
  validation: ValidationRulesType<P>
}

export type ValidationErrorType = { [key: string]: string }

export type ValidationRulesType<T = string> = Partial<{
  required: boolean
  email: boolean
  phone: boolean
  equal: T
}>


export interface TChoiceField {
  label: string
  value: string
  checked: boolean
  count?: number
}