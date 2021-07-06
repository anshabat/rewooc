export interface IFormField<T> {
  value: T
  validation: ValidationRulesType
}

export type FormType = { [key: string]: IFormField<any> }

export type ValidationErrorType = { [key: string]: string }

export type ValidationRulesType = Partial<{
  required: boolean
  email: boolean
  phone: boolean
  equal: string
}>