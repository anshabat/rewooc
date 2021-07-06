import {
  FormType,
  IFormField,
  ValidationErrorType,
  ValidationRulesType,
} from './types'

export function createField<T>(
  value: T,
  validation: ValidationRulesType = {}
): IFormField<T> {
  return {
    value,
    validation,
  }
}

export const validate = (
  formData: FormType
): [boolean, ValidationErrorType] => {
  const errors = Object.entries(formData).reduce<ValidationErrorType>(
    (result, field) => {
      const [key, data] = field

      /* required validation */
      if (data.validation.required) {
        if (!data.value) {
          result[key] = 'Field is required'
        }
      }

      /* email validation */
      if (data.validation.email && data.value) {
        if (!/^(.+)@(.+)\.([a-z]+)$/.test(String(data.value))) {
          result[key] = 'Enter correct email address'
        }
      }

      /* phone validation */
      if (data.validation.phone && data.value) {
        if (!/[0-9]/.test(String(data.value)))
          result[key] = 'Enter correct phone number'
      }

      /* password validation */
      if (data.validation.equal && data.value) {
        if (data.value !== formData[data.validation.equal].value)
          result[key] = 'Passwords are not equal'
      }

      return result
    },
    {}
  )

  const hasErrors = Object.keys(errors).length > 0

  return [hasErrors, errors]
}
